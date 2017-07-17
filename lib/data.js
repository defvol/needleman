
module.exports = { createTable, identityMatrix }

/**
 * Given two strings V and W of length m and n respectively,
 * generate a (n+1)x(m+1) matrix.
 * E.g. let v='GCATGCU' and w='GATTACA'
 *
 *     -  G  C  A  T  G  C  U
 * - [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * G [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * A [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * T [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * T [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * A [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * C [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 * A [ 0, 0, 0, 0, 0, 0, 0, 0 ]
 *
 * @param {string} v
 * @param {string} w
 * @returns {array} table
 */
function createTable (v, w) {
  let m = v.length
  let n = w.length
  let rows = []
  for (var i = 0; i < n + 1; i++) {
    rows[i] = []
    for (var j = 0; j < m + 1; j++) {
      rows[i].push(0)
    }
  }
  return rows
}

/**
 * Generate an identity matrix of size n
 * @param {number} n
 * @param {number} match
 * @param {number} penalization
 * @returns {array} matrix
 */
function identityMatrix (n, match, penalization) {
  match = match || 1
  penalization = penalization || 0

  let matrix = []
  for (var i = 0; i < n; i++) {
    matrix[i] = []
    for (var j = 0; j < n; j++) {
      matrix[i][j] = i === j ? match : penalization
    }
  }
  return matrix
}
