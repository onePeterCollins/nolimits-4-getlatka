const manualBypassButton = document.getElementById('primary-action-btn')
const emitManualBypass = () => {
  chrome.runtime.sendMessage({ action: 'getPageData' }, function (response) {
    // Handle the response from the background script
    console.log('emitManualBypass data:', response)
  })
}

manualBypassButton.addEventListener('click', emitManualBypass)
