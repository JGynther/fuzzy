import generalizedMongeElkan from "@statistics/mongeElkan";

const scorer = {
  single,
  score,
};

type Score = { query: string; threshold?: number } & (
  | { arr: string[]; key?: undefined }
  | { arr: Record<string, any>[]; key: string }
);

function score({ arr, query, key, threshold = 0.7 }: Score) {
  const length = arr.length;
  const scores = [];

  for (let i = 0; i < length; ++i) {
    const string = key ? arr[i][key] : arr[i];
    const score = scorer.single(query, string);

    if (score < threshold) continue;

    scores.push({ string, score });
  }

  return scores;
}

function single(a: string, b: string, m?: number, sim?: (...args: any[]) => number) {
  const tokensA = toTokens(a);
  const tokensB = toTokens(b);
  return generalizedMongeElkan(tokensA, tokensB, m, sim);
}

function toTokens(s: string) {
  const splitters = ["(", ")", "[", "]", "{", "}", ".", ",", ":", ";", "-"];
  return replaceMultiple(s, splitters, " ").split(" ");
}

function replaceMultiple(s: string, arr: string[], to: string) {
  arr.forEach((c) => (s = s.replaceAll(c, to)));
  return s;
}

export default scorer;
