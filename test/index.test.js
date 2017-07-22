var fs = require('fs')
var test = require('tape')
var needleman = require('../lib/index')

const loadFixture = (f) => fs.readFileSync(f).toString().split('\n')

test('run', function (t) {
  let v = 'GCATGCU'
  let w = 'GATTACA'
  let scoringMatrix = needleman.scoringMatrix({ v, w })
  let res = needleman.run(v, w, { scoringMatrix })
  t.equal(res.score, 0)
  t.equal(res.vAligned, 'GCA-TGCU')
  t.equal(res.wAligned, 'G-ATTACA')

  scoringMatrix = needleman.scoringMatrix({ name: 'PAM250' })
  res = needleman.run(v, w, { scoringMatrix })
  t.equal(res.score, 20)
  t.equal(res.vAligned, 'GCA-TGCU')
  t.equal(res.wAligned, 'G-ATTACA')

  v = 'AGTACGCA'
  w = 'TATGC'
  let scores = { match: +2, mismatch: -1 }
  let indel = -2
  scoringMatrix = needleman.scoringMatrix({ v, w, scores })

  res = needleman.run(v, w, { scoringMatrix, indel })
  t.equal(res.score, 1)
  t.equal(res.vAligned, 'AGTACGCA')
  t.equal(res.wAligned, '--TATGC-')

  t.end()
})

test('affine gap', function (t) {
  let scoringMatrix = needleman.scoringMatrix({ name: 'BLOSUM62' })
  let sigma = -11
  let epsilon = -1

  let v = 'PRTEINS'
  let w = 'PRTWPSEIN'
  let res = needleman.run(v, w, { scoringMatrix, sigma, epsilon })
  t.equal(res.score, 8)
  t.equal(res.vAligned, 'PRT---EINS')
  t.equal(res.wAligned, 'PRTWPSEIN-')

  let lines = loadFixture('./test/rosalind_ba5j.txt')
  v = lines[0].trim()
  w = lines[1].trim()
  res = needleman.run(v, w, { scoringMatrix, sigma, epsilon })

  lines = loadFixture('./test/rosalind_ba5j.sol')
  t.equal(res.score, parseInt(lines[0]))
  t.equal(res.vAligned, lines[1])
  t.equal(res.wAligned, lines[2])

  t.end()
})
