var test = require('tape')
var data = require('../lib/data')

let v = 'GCATGCU'
let w = 'GATTACA'

test('createTable', function (t) {
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

test('scoringMatrix', function (t) {
  let matrix = data.scoringMatrix({ v, w })
  t.equal(matrix['A']['A'], +1, 'defaults to similarity scoring')
  t.equal(matrix['A']['U'], -1)
  t.equal(matrix['C']['G'], -1)
  t.equal(matrix['G']['G'], +1)

  let scores = { match: +10, mismatch: -10 }
  matrix = data.scoringMatrix({ v, w, scores })
  t.equal(matrix['C']['G'], -10, 'can pass custom penalizations')
  t.equal(matrix['G']['G'], +10)

  let BLOSUM62 = data.scoringMatrix({ v, w, name: 'BLOSUM62' })
  t.equal(BLOSUM62['A']['A'], +4)
  t.equal(BLOSUM62['A']['U'], undefined)
  t.equal(BLOSUM62['C']['G'], -3)
  t.equal(BLOSUM62['G']['G'], +6)

  let PAM250 = data.scoringMatrix({ v, w, name: 'PAM250' })
  t.equal(PAM250['A']['A'], +2)
  t.equal(PAM250['A']['U'], undefined)
  t.equal(PAM250['C']['G'], -3)
  t.equal(PAM250['G']['G'], +5)

  t.end()
})

test('vocabulary', function (t) {
  t.deepEqual(data.vocabulary(v + w), ['A', 'C', 'G', 'T', 'U'])
  t.end()
})
