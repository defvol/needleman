# needleman

Implementation of the Needleman–Wunsch algorithm, used in bioinformatics to align protein or nucleotide sequences.

Ex. 1: using a simple similarity scoring matrix by default

```js
let v = 'GCATGCU'
let w = 'GATTACA'
needleman.run(v, w)
// returns { score: 0, vAligned: 'GCA-TGCU', wAligned: 'G-ATTACA' }
```

Ex. 2: using PAM250

```js
let v = 'GCATGCU'
let w = 'GATTACA'
let scoringMatrix = needleman.scoringMatrix({ v, w, name: 'PAM250' })
needleman.run(v, w, { scoringMatrix })
// returns { score: 20, vAligned: 'GCA-TGCU', wAligned: 'G-ATTACA' }
```

_try also BLOSUM62_
