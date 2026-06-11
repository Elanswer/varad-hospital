document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('h1, h2, h3.section-title, .hero__title, .hero-v2__title, .inner-hero__title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.1 });

  function wrapWordsInTextNode(textNode, wordIndexCounter) {
    const text = textNode.nodeValue;
    // Split by whitespace but keep spaces separate
    const parts = text.split(/(\s+)/);
    const fragment = document.createDocumentFragment();

    parts.forEach(part => {
      if (part.trim() === '') {
        // Just whitespace
        fragment.appendChild(document.createTextNode(part));
      } else {
        // A word
        const wrap = document.createElement('span');
        wrap.className = 'cinematic-word-wrap';
        
        const inner = document.createElement('span');
        inner.className = 'cinematic-word-inner';
        inner.textContent = part;
        inner.style.transitionDelay = `${wordIndexCounter.value * 0.08}s`;
        
        wrap.appendChild(inner);
        fragment.appendChild(wrap);
        
        wordIndexCounter.value++;
      }
    });

    textNode.parentNode.replaceChild(fragment, textNode);
  }

  function traverseAndWrap(node, wordIndexCounter) {
    const children = Array.from(node.childNodes);
    children.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        wrapWordsInTextNode(child, wordIndexCounter);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (!child.classList.contains('cinematic-word-wrap') && !child.classList.contains('cinematic-word-inner')) {
          traverseAndWrap(child, wordIndexCounter);
        }
      }
    });
  }

  titles.forEach(title => {
    if (title.classList.contains('title-animated')) return;
    title.classList.add('title-animated');
    
    // Some titles might be flex/grid, we might need to ensure inline-block wrapping doesn't break them, 
    // but usually text nodes inside are fine.
    
    const wordIndexCounter = { value: 0 };
    traverseAndWrap(title, wordIndexCounter);
    
    observer.observe(title);
  });
});
