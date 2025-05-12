// Extract Links Button
document.getElementById('extractLinks').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        // Extract all the href links from anchor (<a>) tags
        return Array.from(document.querySelectorAll('a'))
          .map(a => a.href)
          .filter(Boolean); // Remove empty hrefs
      }
    }, (results) => {
      const links = results?.[0]?.result || [];
      const linksListDiv = document.getElementById('linksList');
      linksListDiv.innerHTML = '';  // Clear any existing links

      // Check if links are found, display them or show a message
      if (links.length > 0) {
        // Display each link as a clickable element
        links.forEach(link => {
          const linkElement = document.createElement('a');
          linkElement.href = link;
          linkElement.target = '_blank';  // Open in a new tab
          linkElement.innerText = link;
          linkElement.style.display = 'block';  // Make each link appear on a new line
          linksListDiv.appendChild(linkElement);
        });
      } else {
        linksListDiv.innerHTML = 'No links found on this page.';
      }

      // Store the extracted links for later use
      window.extractedLinks = links;
    });
  });
});

// Wrap Links Button (Wrap links in quotes and separate with commas)
document.getElementById('wrapBtn').addEventListener('click', () => {
  // Check if the extracted links are available
  if (!window.extractedLinks || window.extractedLinks.length === 0) {
    alert('No links to wrap! Please extract links first.');
    return;
  }

  const links = window.extractedLinks;

  // Wrap each link in double quotes and join them with a comma + newline for vertical display
  const wrappedLinks = links.map(link => `"${link}"`).join(',\n');

  // Display the wrapped links in the side panel
  const linksListDiv = document.getElementById('linksList');
  linksListDiv.innerHTML = wrappedLinks;  // Insert the wrapped and newline-separated links

  // Optionally, make the text selectable for easy copying
  linksListDiv.style.whiteSpace = 'pre-wrap';  // Ensures wrapped text stays readable
});
