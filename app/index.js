import 'https://slyd.netlify.com/bundle.js'

if (window.location.hash)
  window.onload = () =>
    window.location = window.location

 // if (navigator.serviceWorker && !navigator.serviceWorker.controller)
 //   navigator.serviceWorker.register('./service-worker.js')
