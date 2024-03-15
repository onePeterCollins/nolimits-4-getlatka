/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0]
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', file_path)
  node.appendChild(script)
}

injectScript(chrome.runtime.getURL('content.js'), 'body')

// globals
const HOST_URL = 'https://getlatka.com/companies/'

// utils
const getPageURL = (() => window.location.href)()
const isOnGetLatkaWebsite = (() => getPageURL.includes(HOST_URL))()

// event listeners
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'getPageData') {
    handleManualBypass()

    const successMessage = { status: 'success', success: true }
    sendResponse(successMessage)
  }
})

window.addEventListener('load', () => {
  handleManualBypass()
})

// event handlers
const handleManualBypass = () => {
  if (isOnGetLatkaWebsite) {
    const dialogRoot = document.querySelector('#__next > .pricing-dialog')
    const blurryOverlay = document.querySelector('.main__content')

    dialogRoot.style.display = 'none'
    blurryOverlay.style.filter = 'none'
  }
}
