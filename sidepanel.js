document.getElementById('extractBtn').addEventListener('click', () => {
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
      const ul = document.getElementById('linkList');
      ul.innerHTML = '';

      if (links.length) {
        links.forEach(link => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
          ul.appendChild(li);
        });
      } else {
        ul.innerHTML = '<li>No links found.</li>';
      }
    });
  });
});
