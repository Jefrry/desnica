(() => {
  const page = document.querySelector('[data-document-page]');
  if (!page) return;
  const contents = [...page.querySelectorAll('[data-document-content]')];
  const error = page.querySelector('[data-document-error]');
  const reader = document.getElementById('document-reader');
  const selectedId = url => url.searchParams.get('document') || 'charter';

  const render = (navigate = false) => {
    const url = new URL(window.location.href);
    const id = selectedId(url);
    let selected;
    contents.forEach(content => {
      content.hidden = content.dataset.documentContent !== id;
      const heading = content.querySelector('[data-document-heading]');
      heading.removeAttribute('id');
      if (!content.hidden) {
        selected = heading;
        heading.id = 'document-reader-document-heading';
      }
    });
    error.hidden = Boolean(selected);
    if (!selected) error.textContent = `Документ с идентификатором «${id}» не найден. Выберите документ из списка выше.`;
    if (navigate && url.hash === '#document-reader') {
      reader.scrollIntoView();
      selected?.focus({ preventScroll: true });
    }
  };

  // Default selection replaces the current entry, preserving other query parameters and hash.
  const initial = new URL(window.location.href);
  if (!initial.searchParams.get('document')) {
    initial.searchParams.set('document', 'charter');
    window.history.replaceState(window.history.state, '', initial);
  }
  page.querySelectorAll('[data-document-link]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = new URL(link.href);
      const url = new URL(window.location.href);
      url.searchParams.set('document', target.searchParams.get('document'));
      url.hash = target.hash;
      if (url.href !== window.location.href) window.history.pushState(null, '', url);
      event.preventDefault();
      render(true);
    });
  });
  window.addEventListener('popstate', () => render(true));
  window.addEventListener('hashchange', () => render(true));
  window.addEventListener('pageshow', () => render(true));
  render(window.location.hash === '#document-reader');
})();
