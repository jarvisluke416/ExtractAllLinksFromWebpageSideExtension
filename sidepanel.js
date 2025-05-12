// Function to extract links from the current page
document.getElementById('extractBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    // Execute script to get all the links from the page
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        return Array.from(document.querySelectorAll('a'))  // Get all 'a' tags
          .map(a => a.href)  // Extract the href attribute (the links)
          .filter(Boolean);  // Remove any empty values
      }
    }, (results) => {
      const links = results?.[0]?.result || [];  // Get the result of links
      const ul = document.getElementById('linkList');
      ul.innerHTML = '';  // Clear previous links

      if (links.length) {
        // Add each link to the list
        links.forEach(link => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
          ul.appendChild(li);
        });
      } else {
        ul.innerHTML = '<li>No links found.</li>';
      }

      // After extracting links, enable the wrap button
      document.getElementById('wrapLinksBtn').disabled = false;

      // Add the event listener for the "Wrap Links" button
      document.getElementById('wrapLinksBtn').addEventListener('click', () => {
        if (links.length === 0) {
          alert('No links extracted to format.');
          return;
        }

        // Wrap the links in quotes and join them with commas
        const formattedLinks = links.map(link => `"${link}"`).join(',\n');

        // Display the formatted links in the <pre> tag
        const outputArea = document.getElementById('formattedLinksOutput');
        outputArea.textContent = formattedLinks;
      });
    });
  });
});
