const publicationCards = document.querySelector('.publication-cards');

publicationCards?.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  const link = event.target.closest('.publication-card a');
  if (link) {
    // Keep each archive entry's focus target when the browser reloads it from history.
    history.replaceState({ ...history.state, publicationCard: link.closest('li').id }, '');
  }
});

window.addEventListener('pageshow', event => {
  const backForward = event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  if (!backForward || !history.state?.publicationCard) return;

  document.getElementById(history.state.publicationCard)?.querySelector('a')?.focus({ preventScroll: true });
});
