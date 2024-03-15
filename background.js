// Background script to relay messages between the popup script and content script

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'getPageData') {
    // Get the active tab and send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getPageData' }, function (response) {
        // Pass the response from content script to the popup script
        sendResponse(response)
      })
    })
    // Return true to indicate that we'll respond asynchronously
    return true
  }
})
