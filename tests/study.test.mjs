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
const guides = Object.values(STUDY_GUIDES).flat().map((guide) => ({
  guide,
  syllabus: read(`../study/${guide.id}/syllabus.md`),
  glossary: read(`../study/${guide.id}/glossary.md`),
}));
const { syllabus, glossary } = guides[0];

test('slugs follow GitHub rules, including duplicates', () => {
  const slug = createSlugger();
  assert.equal(slug('1.1 Architecture and editions'), '11-architecture-and-editions');
  assert.equal(slug('1.6 AI/ML and application development'), '16-aiml-and-application-development');
  assert.equal(slug('Exam traps — 1.1'), 'exam-traps--11');
  assert.equal(slug('Notes'), 'notes');
  assert.equal(slug('Notes'), 'notes-1');
});

for (const { guide, syllabus: md, glossary: gl } of guides) {
  test(`${guide.id}: syllabus splits into intro, its objectives and the self-test`, () => {
    const sections = splitSections(md);
    const objectives = Object.keys(guide.objectives);
    assert.equal(sections.length, guide.sectionCount);
    assert.deepEqual(sections.map((s) => s.short), ['Intro', ...objectives, null]);
    for (const s of sections.slice(1, -1)) {
      assert.ok(s.headings.some((h) => /Exam traps/.test(h.title)), `${s.short} has exam traps`);
      assert.ok(!/^---/m.test(s.md.split('\n').at(-1)), 'trailing rule removed');
    }
    assert.ok(!sections[0].md.startsWith('# '), 'document title is not repeated in the intro');
  });

  test(`${guide.id}: every internal link resolves to a heading`, () => {
    const anchors = new Set(splitSections(md).flatMap((s) => s.anchors));
    const links = [...md.matchAll(/\]\(#([^)]+)\)/g)].map((m) => m[1]);
    assert.ok(links.length >= objectiveCount(guide));
    for (const l of links) assert.ok(anchors.has(l), `missing anchor ${l}`);
  });

  test(`${guide.id}: glossary entries carry objectives and definitions`, () => {
    const entries = parseGlossary(gl);
    assert.ok(entries.length >= 150, `${entries.length} entries`);
    for (const e of entries) {
      assert.ok(e.objectives.length > 0, `${e.term} has an objective`);
      for (const o of e.objectives) assert.ok(o in guide.objectives, `${e.term}: ${o}`);
      assert.ok(e.definition.length > 10, `${e.term} has a definition`);
      assert.ok(!e.definition.startsWith('—') && !e.definition.startsWith('·'), e.term);
    }
    assert.equal(new Set(entries.map((e) => e.id)).size, entries.length, 'ids are unique');
  });

  test(`${guide.id}: no raw HTML tags outside code (they would vanish when rendered)`, () => {
    for (const [name, text] of [['syllabus', md], ['glossary', gl]]) {
      let inFence = false;
      text.split('\n').forEach((line, i) => {
        if (line.startsWith('```')) inFence = !inFence;
        if (inFence) return;
        const tag = /<\/?[A-Za-z][\w-]*[^>]*>/.exec(line.replace(/`[^`]*`/g, ''));
        assert.equal(tag, null, `${name}:${i + 1} ${tag?.[0]}`);
      });
    }
  });

  test(`${guide.id}: self-test becomes numbered cards tagged with objectives`, () => {
    const cards = parseSelfTest(md);
    assert.equal(cards.length, guide.cardCount);
    assert.deepEqual(cards.map((c) => c.n), cards.map((_, i) => i + 1));
    for (const c of cards) assert.ok(c.objective in guide.objectives, `card ${c.n}`);
  });
}

function objectiveCount(guide) {
  return Object.keys(guide.objectives).length;
}

test('domain-1 glossary keeps notes and volatile marks', () => {
  const entries = parseGlossary(glossary);
  const ar = entries.find((e) => e.term === 'Auto-resume (AUTO_RESUME)');
  assert.deepEqual(ar.objectives, ['1.4']);
  assert.equal(entries.find((e) => e.term === 'Cortex').note, '(Snowflake Cortex)');
  assert.ok(entries.find((e) => e.term === 'Document AI').volatile);
});

test('glossary lookup accepts the variants written in the syllabus', () => {
  const index = glossaryIndex(parseGlossary(glossary));
  assert.deepEqual(termKeys('Auto-resume (AUTO_RESUME)').sort(), ['auto-resume', 'auto-resume (auto_resume)', 'auto_resume'].sort());
  for (const text of ['AUTO_RESUME', 'Snowsight', 'micro-partition', 'AI_COMPLETE', 'Snowflake Cortex', 'ORGADMIN ⚠️'])
    assert.ok(index.get(lookupKey(text)), text);
});

test('glossary search matches term, translation and definition', () => {
  const [entry] = parseGlossary(glossary);
  assert.ok(matchesQuery(entry, ''));
  assert.ok(matchesQuery(entry, 'ADJUSTMENT'));
  assert.ok(matchesQuery(entry, 'ajuste'));
  assert.ok(matchesQuery(entry, 'warehouse compute'));
  assert.ok(!matchesQuery(entry, 'iceberg'));
});
