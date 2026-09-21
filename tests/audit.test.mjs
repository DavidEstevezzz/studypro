import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { buildPool, buildExamPool, shuffleChoices, examReadiness } from '../src/lib/quiz.js';
import { normalizeProgress, backupBeforeMigration } from '../src/lib/storage.js';
import { domains, objectives, BANK_VERSION } from '../scripts/audit-config.mjs';
import { batch100 } from '../scripts/review-batch-100.mjs';
import { batch200 } from '../scripts/review-batch-200.mjs';
import { batch300 } from '../scripts/review-batch-300.mjs';

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const questions = read('../public/data/snowpro-core.json');
const [catalog] = read('../public/data/catalog.json');
const verified = questions.filter(q => q.review.status === 'verified');

test('original is unchanged and every original ID survives', () => {
  const bytes = readFileSync(new URL('../audit/original/snowpro-core.json', import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), '8d8b5dc37811eb438f0e09542665619e3820d85810a4cd7fff8727b065f33492');
  const ids = new Set(questions.map(q => q.i));
  assert.equal(ids.size, questions.length);
  for (const q of JSON.parse(bytes)) assert.ok(ids.has(q.i));
});

for (const [batch, idsFile, revision] of [
  [batch100, '../audit/next-100-ids.json', 'cof-c03-2026-09-21-batch100'],
  [batch200, '../audit/batch-200-ids.json', 'cof-c03-2026-09-21-batch200'],
  [batch300, '../audit/batch-300-ids.json', 'cof-c03-2026-09-21-batch300'],
]) test(`all 100 selected pending questions have one applied decision: ${revision}`, () => {
  const ids = read(idsFile);
  assert.equal(batch.length, 100);
  assert.deepEqual(batch.map(q => q.i).sort((a,b) => a-b), ids);
  for (const item of batch) {
    const q = questions.find(q => q.i === item.i);
    assert.equal(q.review.status, item.decision === 'archivar' ? 'archived' : 'verified');
    if (item.decision === 'corregir') assert.equal(q.contentRevision, revision);
  }
  // A new batch must not change the revision of previously corrected questions.
  assert.equal(questions.find(q => q.i === 8).contentRevision, 'cof-c03-2026-09-21');
});

test('reviewed questions have consistent keys, official mappings and checked sources', () => {
  const sources = new Map(read('../audit/sources.json').map(s => [s.url, s]));
  for (const q of verified) {
    assert.ok(objectives[q.objective], `Objective #${q.i}`);
    assert.equal(q.d, domains[q.objective[0]]);
    assert.equal(q.n, q.c.length, `Count #${q.i}`);
    assert.ok(q.c.length > 0);
    assert.equal(new Set(q.c).size, q.c.length);
    assert.ok(q.c.every(i => Number.isInteger(i) && i >= 0 && i < q.o.length));
    assert.equal(sources.get(q.r)?.status, 200, `Source #${q.i}: ${q.r}`);
    const shuffled = shuffleChoices(q);
    assert.deepEqual(shuffled.c.map(i => shuffled.o[i]).sort(), q.c.map(i => q.o[i]).sort());
  }
});

test('exam always has 100 distinct reviewed questions and exact official quotas', () => {
  for (let run = 0; run < 10; run++) {
    const pool = buildPool('exam', questions, { weights: catalog.domainWeights, count: 100, includePending: true });
    assert.equal(pool.length, 100);
    assert.equal(new Set(pool.map(q => q.i)).size, 100);
    assert.ok(pool.every(q => q.review.status === 'verified'));
    for (const [domain, count] of Object.entries(catalog.domainWeights)) {
      assert.equal(pool.filter(q => q.d === domain).length, count);
    }
  }
  assert.throws(() => buildExamPool(questions.filter(q => q.d !== domains[5]), catalog.domainWeights, 100), /Faltan/);
});

test('practice expands only on request and never uses quarantined or archived material', () => {
  assert.equal(buildPool('quick', questions, { count: 2000 }).length, verified.length);
  const expanded = buildPool('quick', questions, { count: 2000, includePending: true });
  assert.ok(expanded.some(q => q.review.status === 'pending'));
  assert.ok(expanded.every(q => ['verified', 'pending'].includes(q.review.status)));
});

test('progress migration preserves history and marks but resets mastery for revised questions', () => {
  const question = questions.find(q => q.contentRevision);
  const old = { version: 2, domStat: { old: { seen: 5, ok: 4 } }, markedIds: [question.i], wrongIds: [9999], sessions: [{mode:'exam', total:100, ok:90}], byQuestion: {
    [question.i]: { seen: 5, ok: 4, mastered: true, streak: 3, srsLevel: 4, domain: 'old' },
    9999: { seen: 2, ok: 1 },
  }};
  const snapshot = structuredClone(old);
  const migrated = normalizeProgress(old, Object.values(domains), questions, BANK_VERSION);
  assert.deepEqual(old, snapshot);
  assert.deepEqual(migrated.sessions, old.sessions);
  assert.deepEqual(migrated.markedIds, old.markedIds);
  assert.deepEqual(migrated.wrongIds, old.wrongIds);
  assert.deepEqual(migrated.byQuestion[9999], old.byQuestion[9999]);
  assert.equal(migrated.byQuestion[question.i].mastered, false);
  assert.equal(migrated.byQuestion[question.i].seen, 5);
  assert.deepEqual(migrated.domStat[question.d], { seen: 5, ok: 4 });
  assert.deepEqual(normalizeProgress(migrated, Object.values(domains), questions, BANK_VERSION), migrated);
  const saved = new Map();
  globalThis.localStorage = { getItem: k => saved.get(k), setItem: (k,v) => saved.set(k,v) };
  backupBeforeMigration('snowpro-core', old, BANK_VERSION);
  backupBeforeMigration('snowpro-core', { other: true }, BANK_VERSION);
  assert.deepEqual(JSON.parse([...saved.values()][0]), old);
  delete globalThis.localStorage;
});

test('old exams and rounding cannot satisfy the current practice target', () => {
  const sessions = Array.from({length:3}, () => ({mode:'exam',total:100,ok:95}));
  assert.equal(examReadiness(sessions,75,BANK_VERSION).ready,false);
  const current = sessions.map(s => ({...s,bankVersion:BANK_VERSION,total:200,ok:149}));
  assert.equal(examReadiness(current,75,BANK_VERSION).recentPassed,0);
});
