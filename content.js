chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request); // debug
    if (request.action === 'getLinks') {
      const links = Array.from(document.querySelectorAll('a'))
                        .map(a => a.href)
                        .filter(href => href);
      console.log("Extracted links:", links); // debug
      sendResponse({ links });
    }
    return true; // keep this if you're sending async response
  });
  