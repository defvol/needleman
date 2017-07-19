// usage: node data/BLOSUM62.js | jsonlint > data/BLOSUM62.json

const assert = require('assert')
const fs = require('fs')

let lines = fs.readFileSync('data/BLOSUM62.txt')
  .toString()
  .trim()
  .split('\n')
  .slice(6)
let matrix = {}
let header = lines[0].trim().replace(/\s+/g, ',')
  .split(',')

assert.equal(header.length, 24)

for (var i = 1; i < lines.length; i++) {
  let values = lines[i].trim().replace(/\s+/g, ',').split(',')
  let rowkey = values.shift()

  assert.equal(values.length, 24)

  matrix[rowkey] = {}
  for (var j in header) {
    let colkey = header[j]
    matrix[rowkey][colkey] = parseInt(values[j])
  }
}

assert.equal(matrix['A']['A'], +4)
assert.equal(matrix['A']['Y'], -2)
assert.equal(matrix['T']['L'], -1)
assert.equal(matrix['H']['H'], +8)
assert.equal(matrix['C']['W'], -2)

console.log(JSON.stringify(matrix))
