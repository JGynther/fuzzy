function jaro(a: string, b: string) {
  [a, b] = [a, b].map((s) => s.toLowerCase().trim());
  if (a === b) return 1.0;

  const [lenA, lenB] = [a.length, b.length];

  const [m, matchesA, matchesB] = matchingChars(a, b, lenA, lenB);
  if (m === 0) return 0.0;

  const t = transpositions(a, b, matchesA, matchesB, lenA);

  return (m / lenA + m / lenB + (m - t) / m) / 3.0;
}

function transpositions(a: string, b: string, arrA: Uint8Array, arrB: Uint8Array, len: number) {
  let t = 0;
  let j = 0;

  for (let i = 0; i < len; ++i) {
    if (arrA[i] === 0) continue;
    while (arrB[j] === 0) ++j;

    if (a[i] !== b[j]) t += 0.5;

    ++j;
  }

  return t;
}

function matchingChars(
  a: string,
  b: string,
  lenA: number,
  lenB: number
): [number, Uint8Array, Uint8Array] {
  const maxDistance = Math.floor(Math.max(lenA, lenB) / 2) - 1;

  let matching = 0;
  const matchesA = new Uint8Array(lenA);
  const matchesB = new Uint8Array(lenB);

  for (let i = 0; i < lenA; ++i) {
    const start = Math.max(0, i - maxDistance);
    const end = Math.min(lenB, i + maxDistance + 1);

    for (let j = start; j < end; ++j) {
      if (matchesB[j]) continue;
      if (a[i] !== b[j]) continue;

      matchesA[i] = matchesB[j] = 1;
      ++matching;

      break;
    }
  }

  return [matching, matchesA, matchesB];
}

export default jaro;
