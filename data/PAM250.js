// usage: node data/PAM250.js | jsonlint > data/PAM250.json

const assert = require('assert')
const fs = require('fs')

let lines = fs.readFileSync('data/PAM250.txt')
  .toString()
  .trim()
  .split('\r\n')
let matrix = {}
let header = lines[0].replace(/\s+/g, ',').split(',')

for (var i = 1; i < lines.length; i++) {
  let values = lines[i].replace(/\s+/g, ',').split(',')
  let rowkey = values.shift()
  matrix[rowkey] = {}
  for (var j in header) {
    let colkey = header[j]
    matrix[rowkey][colkey] = parseInt(values[j])
  }
}

assert.equal(matrix['A']['A'], +2)
assert.equal(matrix['A']['Y'], -3)
assert.equal(matrix['T']['L'], -2)
assert.equal(matrix['H']['H'], +6)
assert.equal(matrix['C']['W'], -8)

console.log(JSON.stringify(matrix))
