document.getElementById('extractLinks').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        return Array.from(document.querySelectorAll('a'))
          .map(a => a.href)
          .filter(Boolean);
      }
    }, (results) => {
      const links = results?.[0]?.result || [];
      const linksListDiv = document.getElementById('linksList');
      linksListDiv.innerHTML = '';  // Clear any existing links

      if (links.length > 0) {
        // Create a list of clickable links
        links.forEach(link => {
          const linkElement = document.createElement('a');
          linkElement.href = link;
          linkElement.target = '_blank';  // Open in new tab
          linkElement.innerText = link;
          linkElement.style.display = 'block';  // Make each link appear on a new line
          linksListDiv.appendChild(linkElement);
        });
      } else {
        linksListDiv.innerHTML = 'No links found on this page.';
      }
    });
  });
});

document.getElementById('wrapLinks').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        return Array.from(document.querySelectorAll('a'))
          .map(a => a.href)
          .filter(Boolean);
      }
    }, (results) => {
      const links = results?.[0]?.result || [];
      const wrappedLinks = links.map(link => `"${link}"`).join(', ');

      const linksListDiv = document.getElementById('linksList');
      if (wrappedLinks.length > 0) {
        linksListDiv.innerHTML = wrappedLinks;
      } else {
        linksListDiv.innerHTML = 'No links found on this page.';
      }
    });
  });
});
