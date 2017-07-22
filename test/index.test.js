var test = require('tape')
var needleman = require('../lib/index')

test('run', function (t) {
  let v = 'GCATGCU'
  let w = 'GATTACA'
  let scoringMatrix = needleman.scoringMatrix({ v, w })
  let res = needleman.run(v, w, { scoringMatrix })
  t.equal(res.score, 0)
  t.equal(res.vAligned, 'GCA-TGCU')
  t.equal(res.wAligned, 'G-ATTACA')

  scoringMatrix = needleman.scoringMatrix({ v, w, name: 'PAM250' })
  res = needleman.run(v, w, { scoringMatrix })
  t.equal(res.score, 20)
  t.equal(res.vAligned, 'GCA-TGCU')
  t.equal(res.wAligned, 'G-ATTACA')

  v = 'PRTEINS'
  w = 'PRTWPSEIN'
  scoringMatrix = needleman.scoringMatrix({ v, w, name: 'BLOSUM62' })
  res = needleman.run(v, w, {
    scoringMatrix,
    sigma: -11,
    epsilon: -1
  })
  t.equal(res.score, 8)
  t.equal(res.vAligned, 'PRT---EINS')
  t.equal(res.wAligned, 'PRTWPSEIN-')

  t.end()
})
