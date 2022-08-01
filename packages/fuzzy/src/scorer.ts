import generalizedMongeElkan, { SimFunction } from "@statistics/mongeElkan";

const scorer = {
  single,
  score,
};

type Score = { query: string; threshold?: number } & (
  | { data: string[]; key?: undefined }
  | { data: Record<string, string>[]; key: string }
);

function score({ data, query, key, threshold = 0.7 }: Score) {
  const length = data.length;
  const scores = [];

  for (let i = 0; i < length; ++i) {
    let string = data[i];

    if (typeof string === "object") {
      if (!key)
        throw new Error("Are you missing a key? Key is required if data is an array of objects.");
      string = string[key];
    }

    const score = scorer.single(query, string as string);
    if (score < threshold) continue;

    scores.push({ string, score });
  }

  return scores;
}

function single(a: string, b: string, m?: number, sim?: SimFunction) {
  const tokensA = toTokens(a);
  const tokensB = toTokens(b);
  return generalizedMongeElkan(tokensA, tokensB, m, sim);
}

function toTokens(s: string) {
  s = s.toLowerCase();
  const splitters = ["(", ")", "[", "]", "{", "}", ".", ",", ":", ";", "-"];
  return replaceMultiple(s, splitters, " ").split(" ");
}

function replaceMultiple(s: string, arr: string[], to: string) {
  arr.forEach((c) => (s = replaceAll(s, c, to)));
  return s;
}

function replaceAll(s: string, c: string, to: string) {
  let result = "";
  for (let i = 0; i < s.length; ++i) result += s[i] === c ? to : s[i];
  return result;
}

export default scorer;
export type { Score };
