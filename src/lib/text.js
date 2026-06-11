const cp1252Bytes = new Map([
  ['€', 0x80],
  ['‚', 0x82],
  ['ƒ', 0x83],
  ['„', 0x84],
  ['…', 0x85],
  ['†', 0x86],
  ['‡', 0x87],
  ['ˆ', 0x88],
  ['‰', 0x89],
  ['Š', 0x8a],
  ['‹', 0x8b],
  ['Œ', 0x8c],
  ['Ž', 0x8e],
  ['‘', 0x91],
  ['’', 0x92],
  ['“', 0x93],
  ['”', 0x94],
  ['•', 0x95],
  ['–', 0x96],
  ['—', 0x97],
  ['˜', 0x98],
  ['™', 0x99],
  ['š', 0x9a],
  ['›', 0x9b],
  ['œ', 0x9c],
  ['ž', 0x9e],
  ['Ÿ', 0x9f],
]);

const decoder = new TextDecoder('utf-8', { fatal: false });

export function repairText(value) {
  if (typeof value !== 'string' || !/[ÃÂâ]/.test(value)) return value;

  const bytes = [];
  for (const char of value) {
    const mapped = cp1252Bytes.get(char);
    if (mapped !== undefined) {
      bytes.push(mapped);
      continue;
    }

    const code = char.charCodeAt(0);
    if (code <= 0xff) bytes.push(code);
    else return value;
  }

  return decoder.decode(new Uint8Array(bytes));
}

export function repairDeep(value) {
  if (typeof value === 'string') return repairText(value);
  if (Array.isArray(value)) return value.map(repairDeep);
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, repairDeep(item)])
  );
}
