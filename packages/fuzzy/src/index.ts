import scorer, { Score } from "@scorer";

const BASIC_SORT = (a: { score: number }, b: { score: number }) => b.score - a.score;

function find(queryObject: Score) {
  const scores = scorer.score(queryObject);
  return scores.sort(BASIC_SORT).slice(0, 10);
}

export { find, scorer };
