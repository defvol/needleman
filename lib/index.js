const data = require('./data')

module.exports = {
  run,
  scoringMatrix: data.scoringMatrix
}

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
  let S = options.scoringMatrix || data.scoringMatrix({ v, w })
  let n = F.length
  let m = F[0].length
  let B = JSON.parse(JSON.stringify(F))

  let i
  let j

  // Fill in borders
  for (i = 1; i < n; i++) F[i][0] = indel * i
  for (j = 1; j < m; j++) F[0][j] = indel * j

  // Traverse the grid
  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      let matrixScore
      try {
        matrixScore = S[v[i - 1]][w[j - 1]]
      } catch (e) {
        // e.g. a letter is not found in the matrix
        matrixScore = indel
      }

      let match = F[i - 1][j - 1] + matrixScore
      let ins = F[i][j - 1] + indel
      let del = F[i - 1][j] + indel
      F[i][j] = [match, ins, del].reduce((a, b) => Math.max(a, b))

      // Keep arrows for easier backtracking
      if (F[i][j] === match) {
        B[i][j] = '\\'
      } else if (F[i][j] === ins) {
        B[i][j] = '-'
      } else {
        B[i][j] = '|'
      }
    }
  }

  let score = F[i - 1][j - 1]

  // String alignment
  let vAligned = ''
  let wAligned = ''
  i = n - 1
  j = m - 1

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && B[i][j] === '\\') {
      vAligned = v[i - 1] + vAligned
      wAligned = w[j - 1] + wAligned
      i--
      j--
    } else if (j > 0 && B[i][j] === '-') {
      vAligned = '-' + vAligned
      wAligned = w[j - 1] + wAligned
      j--
    } else {
      vAligned = v[i - 1] + vAligned
      wAligned = '-' + wAligned
      i--
    }
  }

  return { score, vAligned, wAligned }
}
