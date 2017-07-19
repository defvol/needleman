const fs = require('fs')
const path = require('path')

module.exports = {
  createTable,
  identityMatrix,
  scoringMatrix,
  vocabulary
}

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

/**
 * Load a JSON file
 * @param {string} filename
 * @param {function} callback
 */
function loadJSON (filename, callback) {
  let filepath = path.join(__dirname, '..', 'data', `${filename}.json`)
  fs.readFile(filepath, (err, data) => {
    if (err) return callback(err)
    try {
      let obj = JSON.parse(data.toString())
      callback(null, obj)
    } catch (ex) {
      callback(ex)
    }
  })
}

/**
 * Generate a scoring matrix based on similarity
 * @param {string} v
 * @param {string} w
 * @returns {array} matrix
 */
function similarityMatrix (v, w) {
  let vocab = vocabulary(v + w)
  let matrix = {}
  for (var i in vocab) {
    matrix[vocab[i]] = {}
    for (var j in vocab) {
      matrix[vocab[i]][vocab[j]] = i === j ? 1 : 0
    }
  }

  return matrix
}

/**
 * Generate a scoring matrix for strings V and W
 * Loads PAM, BLOSUM, and defaults to a similarity matrix
 * References:
 * - https://www.ncbi.nlm.nih.gov/Class/FieldGuide/BLOSUM62.txt
 * - https://www.ncbi.nlm.nih.gov/IEB/ToolBox/C_DOC/lxr/source/data/PAM250
 * @param {string} v
 * @param {string} w
 * @param {string} name of scoring matrix
 * @param {function} callback
 * @returns {object} dictionary of dictionaries
 */
function scoringMatrix (v, w, name, callback) {
  name = name || 'similarity'

  let matrix = {}
  switch (name) {
    case 'similarity':
      matrix = similarityMatrix(v, w)
      break
    case 'BLOSUM62':
      loadJSON('BLOSUM62', callback)
      break
    case 'PAM250':
      loadJSON('PAM250', callback)
      break
    default:
  }

  return matrix
}

/**
 * Find the unique set of characters in a string
 * @param {string} text
 * @returns {array} vocab
 */
function vocabulary (text) {
  let dictionary = text.split('')
    .reduce((p, c) => { p[c] = 1; return p }, {})
  return Object.keys(dictionary).sort()
}
