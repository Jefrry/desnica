(() => {
  const page = document.querySelector('[data-report-page]');
  if (!page) return;
  const contents = [...page.querySelectorAll('[data-report-content]')];
  const texts = [...page.querySelectorAll('[data-report-text]')];
  const form = page.querySelector('[data-report-form]');
  const yearSelect = document.getElementById('report-year');
  const status = page.querySelector('[data-report-status]');
  const archives = [...page.querySelectorAll('[data-report-archive]')];
  const reader = document.getElementById('report-reader');
  const panelHeading = document.getElementById('report-panel-heading');
  const error = page.querySelector('[data-report-error]');
  const defaultYear = contents[0]?.dataset.reportContent || '2025';

  const render = (navigate = false) => {
    const url = new URL(window.location.href);
    const year = url.searchParams.get('year') || defaultYear;
    const selected = contents.find(content => content.dataset.reportContent === year);
    const text = texts.find(content => content.dataset.reportText === year);
    contents.forEach(content => { content.hidden = content !== selected; });
    texts.forEach(content => {
      content.hidden = content !== text;
      const heading = content.querySelector('[data-report-text-heading]');
      heading.removeAttribute('id');
      if (!content.hidden) heading.id = 'report-reader-document-heading';
    });
    yearSelect.querySelector('[data-report-unknown]')?.remove();
    if (!selected) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = `Недоступный год: ${year}`;
      option.dataset.reportUnknown = '';
      yearSelect.prepend(option);
    }
    yearSelect.value = year;
    archives.forEach(item => { item.hidden = item.dataset.reportArchive === year; });
    panelHeading.textContent = selected ? `Отчёт за ${year} год` : 'Отчёт не найден';
    error.hidden = Boolean(selected);
    if (!selected) error.textContent = `Отчёт за ${year} год не найден. Выберите доступный год.`;

    const anchor = document.getElementById(url.hash.slice(1));
    const readerAnchor = anchor && reader.contains(anchor) && !anchor.closest('[data-report-text][hidden]');
    reader.hidden = !selected || !text || !(url.hash === '#report-reader' || readerAnchor);
    if (navigate) {
      const target = !reader.hidden && url.hash === '#report-reader'
        ? document.getElementById('report-reader-heading')
        : (!reader.hidden && readerAnchor) ? anchor
          : url.hash === '#report-panel' ? panelHeading
            : !url.hash ? yearSelect : anchor;
      if (target && !target.closest('[hidden]')) {
        if (url.hash) target.scrollIntoView();
        target.focus({ preventScroll: true });
      }
      status.textContent = selected ? `Показан отчёт за ${year} год` : error.textContent;
    }
  };

  const initial = new URL(window.location.href);
  if (!initial.searchParams.get('year')) {
    initial.searchParams.set('year', defaultYear);
    window.history.replaceState(window.history.state, '', initial);
  }
  form.querySelector('button[type="submit"]').hidden = true;
  const selectYear = event => {
    event.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('year', yearSelect.value);
    url.hash = '';
    if (url.href !== window.location.href) window.history.pushState(null, '', url);
    render(true);
  };
  form.addEventListener('submit', selectYear);
  yearSelect.addEventListener('change', selectYear);
  page.querySelectorAll('[data-report-link]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = new URL(link.href);
      const url = new URL(window.location.href);
      url.searchParams.set('year', target.searchParams.get('year'));
      url.hash = target.hash;
      if (url.href !== window.location.href) window.history.pushState(null, '', url);
      event.preventDefault();
      render(true);
    });
  });
  window.addEventListener('popstate', () => render(true));
  window.addEventListener('hashchange', () => render(true));
  window.addEventListener('pageshow', () => render(Boolean(window.location.hash)));
  render(Boolean(window.location.hash));
})();
