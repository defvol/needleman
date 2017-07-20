var data = require('../lib/data')
var test = require('tape')
var needleman = require('../lib/index')

test('run', function (t) {
  let v = 'GCATGCU'
  let w = 'GATTACA'
  let scores = { match: +1, mismatch: -1 }
  let scoringMatrix = data.scoringMatrix({ v, w, scores })
  let res = needleman.run(v, w, { scoringMatrix })
  t.equal(res.score, 0)
  t.equal(res.vAligned, 'GCA-TGCU')
  t.equal(res.wAligned, 'G-ATTACA')
  t.end()
})
