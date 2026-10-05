import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  createSlugger,
  glossaryIndex,
  lookupKey,
  matchesQuery,
  parseGlossary,
  parseSelfTest,
  splitSections,
  termKeys,
} from '../src/study/parse.js';
import { STUDY_GUIDES } from '../src/study/registry.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const syllabus = read('../study/domain-1/syllabus.md');
const glossary = read('../study/domain-1/glossary.md');
const [guide] = STUDY_GUIDES['snowpro-core'];

test('slugs follow GitHub rules, including duplicates', () => {
  const slug = createSlugger();
  assert.equal(slug('1.1 Architecture and editions'), '11-architecture-and-editions');
  assert.equal(slug('1.6 AI/ML and application development'), '16-aiml-and-application-development');
  assert.equal(slug('Exam traps — 1.1'), 'exam-traps--11');
  assert.equal(slug('Notes'), 'notes');
  assert.equal(slug('Notes'), 'notes-1');
});

test('syllabus splits into intro, six objectives and the self-test', () => {
  const sections = splitSections(syllabus);
  assert.equal(sections.length, guide.sectionCount);
  assert.deepEqual(sections.map((s) => s.short), ['Intro', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', null]);
  for (const s of sections.slice(1, 7)) {
    assert.ok(s.headings.some((h) => /Exam traps/.test(h.title)), `${s.short} has exam traps`);
    assert.ok(!/^---/m.test(s.md.split('\n').at(-1)), 'trailing rule removed');
  }
  assert.ok(!sections[0].md.startsWith('# '), 'document title is not repeated in the intro');
});

test('every internal link of the syllabus resolves to a heading', () => {
  const anchors = new Set(splitSections(syllabus).flatMap((s) => s.anchors));
  const links = [...syllabus.matchAll(/\]\(#([^)]+)\)/g)].map((m) => m[1]);
  assert.ok(links.length >= 6);
  for (const l of links) assert.ok(anchors.has(l), `missing anchor ${l}`);
});

test('glossary entries carry objectives, translation and definition', () => {
  const entries = parseGlossary(glossary);
  assert.ok(entries.length >= 200);
  for (const e of entries) {
    assert.ok(e.objectives.length > 0, `${e.term} has an objective`);
    for (const o of e.objectives) assert.ok(o in guide.objectives, `${e.term}: ${o}`);
    assert.ok(e.definition.length > 10, `${e.term} has a definition`);
    assert.ok(!e.definition.startsWith('—') && !e.definition.startsWith('·'), e.term);
  }
  const ar = entries.find((e) => e.term === 'Auto-resume (AUTO_RESUME)');
  assert.deepEqual(ar.objectives, ['1.4']);
  const cortex = entries.find((e) => e.term === 'Cortex');
  assert.equal(cortex.note, '(Snowflake Cortex)');
  assert.ok(entries.find((e) => e.term === 'Document AI').volatile);
  assert.equal(new Set(entries.map((e) => e.id)).size, entries.length, 'ids are unique');
});

test('glossary lookup accepts the variants written in the syllabus', () => {
  const index = glossaryIndex(parseGlossary(glossary));
  assert.deepEqual(termKeys('Auto-resume (AUTO_RESUME)').sort(), ['auto-resume', 'auto-resume (auto_resume)', 'auto_resume'].sort());
  for (const text of ['AUTO_RESUME', 'Snowsight', 'micro-partition', 'AI_COMPLETE', 'Snowflake Cortex', 'ORGADMIN ⚠️'])
    assert.ok(index.get(lookupKey(text)), text);
});

test('self-test becomes 90 cards tagged with objectives', () => {
  const cards = parseSelfTest(syllabus);
  assert.equal(cards.length, guide.cardCount);
  assert.deepEqual(cards.map((c) => c.n), cards.map((_, i) => i + 1));
  for (const c of cards) assert.ok(c.objective in guide.objectives, `card ${c.n}`);
});

test('glossary search matches term, translation and definition', () => {
  const [entry] = parseGlossary(glossary);
  assert.ok(matchesQuery(entry, ''));
  assert.ok(matchesQuery(entry, 'ADJUSTMENT'));
  assert.ok(matchesQuery(entry, 'ajuste'));
  assert.ok(matchesQuery(entry, 'warehouse compute'));
  assert.ok(!matchesQuery(entry, 'iceberg'));
});
