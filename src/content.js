import App from './toolbar/App.svelte'

const html = `<div id="crx-app"></div>`
const doc = new DOMParser().parseFromString(html, 'text/html')
const target = doc.body.firstElementChild
document.body.prepend(target)

const app = new App({ target })

export default app