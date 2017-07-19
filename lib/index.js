const data = require('./data')

module.exports = { run }

/**
 * Find the optimal alignment between two strings using the
 * Needleman and Wunsch algorithm
 * @param {string} v
 * @param {string} w
 * @param {object} options { indel, scoringMatrix }
 * @returns {object} alignment { score, vAligned, wAligned }
 */
function run (v, w, options) {
  options = options || {}
  let F = data.createTable(v, w)
  let indel = options.indel || -1
  let S = options.scoringMatrix || data.scoringMatrix(v, w)
  let n = F.length
  let m = F[0].length

  let i
  let j

  // Fill in borders
  for (i = 1; i < n; i++) F[i][0] = indel * i
  for (j = 1; j < m; j++) F[0][j] = indel * j

  // Traverse the grid
  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      let match = F[i - 1][j - 1] + S[v[i - 1]][w[j - 1]]
      let del = F[i - 1][j] + indel
      let ins = F[i][j - 1] + indel
      F[i][j] = [match, ins, del].reduce((a, b) => Math.max(a, b))
    }
  }

  let score = F[i - 1][j - 1]
  return { score, F }
}
