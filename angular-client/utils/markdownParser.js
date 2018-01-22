const markdownParser = function(text) {
  // TODO - your code here!

  let buffer = text.split("***")

  let bolded = buffer.map( (words, idx) => {
    if (idx > 0 && idx % 2 !== 0) {
      return '<bold>' + words + '</bold>';
    } else {
      return words;
    }
  })

  let italed = bolded.join('').split('_').map( (words, idx) => {
    if (idx > 0 && idx % 2 !== 0) {
      return '<em>' + words + '</em>'
    } else {
      return words
    }
  })

  let headed5 = italed.join('').split('#####').map( (words, idx) => {
    if (idx > 0 && idx % 2 !== 0) {
      return '<h5>' + words + '</h5>'
    } else {
      return words
    }
  })

  let headed4 = headed5.join('').split('####').map( (words, idx) => {
    if (idx > 0 && idx % 2 !== 0) {
      return '<h4>' + words + '</h4>'
    } else {
      return words
    }
  })

  let headed3 = italed.join('').split('###').map( (words, idx) => {
    if (idx > 0 && idx % 2 !== 0) {
      return '<h3>' + words + '</h3>'
    } else {
      return words
    }
  })

  let headed2 = headed3.join('').split('##').map( (words, idx) => {
        if (idx > 0 && idx % 2 !== 0) {
      return '<h2>' + words + '</h2>'
    } else {
      return words
    }
  })

  let headed = headed2.join('').split('#').map( (words, idx) => {
        if (idx > 0 && idx % 2 !== 0) {
      return '<h1>' + words + '</h1>'
    } else {
      return words
    }
  })

  let escaped = headed.join('').split('<script>').map( (words, idx) => {
    if (idx > 0 && idx % 2 !== 0) {
      words[0] = '!'
    } else {
      return words
    }
  })
  return escaped.join('')
}
// module.exports = markdownParser;
window.markdownParser = markdownParser;