import scorer, { Score } from "@scorer";

const BASIC_SORT = (a: { score: number }, b: { score: number }) => b.score - a.score;

function find(queryObject: Score & { count?: number }) {
  const scores = scorer.score(queryObject);
  const sorted = scores.sort(BASIC_SORT);
  return queryObject.count ? sorted.slice(0, queryObject.count) : sorted;
}

export { find, scorer };
