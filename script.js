(() => {
  document.querySelectorAll('*').forEach(element => {
    element.addEventListener('mouseover', () => {
      if (!element.classList.contains('marked')) {
        markWords(element);
        element.classList.add('marked');
      }
    });
  });

  function markWords(element) {
    const childNodes = [...element.childNodes];
    if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
      const words = element.textContent.split(' ');
      let markedText = '';
      words.forEach(word => {
        markedText += `<myhighlight>${word}</myhighlight> `;
      });
      element.innerHTML = markedText.trim();
    } else {
      childNodes.forEach(childNode => {
        if (childNode.nodeType === Node.TEXT_NODE) {
          console.log(childNode.textContent)
          const words = childNode.textContent.split(' ');
          let markedText = '';
          words.forEach(word => {
            markedText += `<myhighlight>${word}</myhighlight> `;
          });
          childNode.replaceWith(...createElementsFromHTML(markedText.trim()));
        }
      });
    }
  }

  function createElementsFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.childNodes;
  }

  const style = document.createElement('style');
  style.textContent = `
  myhighlight {
    background: none;
  }
  myhighlight:hover {
    background: #bfad5044;
  }
  `;
  document.head.appendChild(style);
})();
