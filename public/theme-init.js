// Runs before the page renders so the correct theme is shown immediately.
// Kept as an external file so the Content Security Policy needs no 'unsafe-inline'.
;(function () {
  var theme = null
  try {
    theme = window.localStorage.getItem('theme')
  } catch {
    /* storage unavailable */
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  if (theme === 'dark') document.documentElement.classList.add('dark')
})()
