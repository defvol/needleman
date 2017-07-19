var test = require('tape')
var needleman = require('../lib/index')

test('run', function (t) {
  let v = 'GCATGCU'
  let w = 'GATTACA'
  let res = needleman.run(v, w)
  t.equal(res.score, 3)
  t.end()
})
