import jaroSimilarity from "./jaroSimilarity";

// https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
function jaroWinkler(a: string, b: string, p = 0.1) {
  p = Math.min(0.25, p);

  const simj = jaroSimilarity(a, b);
  const length = Math.min(a.length, b.length);
  let l = 0;

  for (let i = 0; i < length; ++i) {
    if (a[i] !== b[i]) break;
    ++l;
  }

  l = Math.min(4, l);

  return simj + l * p * (1 - simj);
}

export default jaroWinkler;
