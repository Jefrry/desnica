(() => {
  const dialog = document.querySelector('#mobile-navigation-dialog');
  const openButton = document.querySelector('.mobile-open');
  const closeButton = document.querySelector('.mobile-close');
  const desktop = document.querySelector('.desktop-navigation');
  if (!dialog || !openButton || !closeButton || !desktop) return;

  const setExpanded = (button, expanded) => {
    button.setAttribute('aria-expanded', String(expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
  };
  const closeDropdowns = (except) => {
    desktop.querySelectorAll('.group-toggle').forEach(button => {
      if (button !== except) setExpanded(button, false);
    });
  };
  document.querySelectorAll('.group-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      if (desktop.contains(button)) closeDropdowns(button);
      setExpanded(button, !expanded);
    });
  });
  desktop.querySelectorAll('.nav-item').forEach(item => {
    const button = item.querySelector('.group-toggle');
    if (!button) return;
    item.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setExpanded(button, false);
        button.focus();
      }
    });
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) setExpanded(button, false);
    });
  });
  document.addEventListener('click', event => {
    if (!desktop.contains(event.target)) closeDropdowns();
  });
  desktop.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeDropdowns()));

  let previousOverflow = '';
  openButton.addEventListener('click', () => {
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    openButton.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    openButton.setAttribute('aria-expanded', 'false');
    dialog.querySelectorAll('.group-toggle').forEach(button => setExpanded(button, false));
    const returnTarget = openButton.getClientRects().length ? openButton : document.querySelector('.site-header .brand');
    returnTarget.focus();
  });
  dialog.querySelectorAll('a').forEach(link => link.addEventListener('click', () => dialog.close()));
  // Native modal dialog makes the rest of the document inert; wrap Tab explicitly.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('a[href], button:not([disabled])')]
      .filter(element => element.getClientRects().length);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  const desktopWidth = window.matchMedia('(min-width: 75rem)');
  desktopWidth.addEventListener('change', event => {
    if (event.matches && dialog.open) dialog.close();
    closeDropdowns();
  });
})();
