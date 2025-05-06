chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.sidePanel.setOptions({
        path: 'sidepanel.html'
      });
    }
  });
  