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

  t.end()
})
