var test = require('tape')
var data = require('../lib/data')

test('createTable', function (t) {
  let v = 'GCATGCU'
  let w = 'GATTACA'
  let table = data.createTable(v, w)
  t.equal(table.length, w.length + 1)
  t.equal(table[0].length, v.length + 1)
  t.end()
})

test('identityMatrix', function (t) {
  let sim = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]
  t.deepEqual(data.identityMatrix(4), sim)
  t.equal(data.identityMatrix(4, 2)[0][0], 2, 'matches with custom value')
  t.equal(data.identityMatrix(4, 2)[0][1], 0)
  t.equal(data.identityMatrix(4, 2, -4)[0][0], +2)
  t.equal(data.identityMatrix(4, 2, -4)[0][1], -4, 'custom penalization')
  t.end()
})
