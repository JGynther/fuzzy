import jaroWinkler from "@statistics/jaroWinkler";

/**
 * Calculates a generalized Monge-Elkan [1] similarity measure between two strings split into tokens.
 *
 * @param {string[]} a A string split into tokens.
 * @param {string[]} b A (different) string split into tokens.
 * @param {number} [m = 5] Degree for the generalized mean. Defaults to a magic m = 5.
 * @param {(...args: any[]) => number} [sim = jaroWinkler] Inner similarity function sim', defaults to Jaro-Winkler distance
 * @returns {number} A generalized Monge-Elkan similarity score [0, 1] inclusive
 *
 * @example const score = generalizedMongeElkan(["Lorem", "ipsum"], ["dolor", "sit"]);
 *
 * @citation [1] Sergio Jimenez, Claudia Becerra, Alexander Gelbukh, Fabio Gonzalez:
 * Generalized Mongue-Elkan Method for Approximate Text String Comparison (2009)
 */
function generalizedMongeElkan(
  a: string[],
  b: string[],
  m = 5,
  sim: (...args: any[]) => number = jaroWinkler
): number {
  const l1 = a.length;
  const l2 = b.length;

  let sum = 0;

  for (let i = 0; i < l1; ++i) {
    let maxSim = 0;

    for (let j = 0; j < l2; ++j) {
      maxSim = Math.max(maxSim, sim(a[i], b[j]));
    }

    sum += maxSim ** m;
  }

  return (sum / l1) ** (1 / m);
}

export default generalizedMongeElkan;
