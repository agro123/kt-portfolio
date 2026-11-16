// Progressive enhancement only — every section is readable and navigable without this file.

const $$ = <T extends HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

const store = {
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable (private mode) */
    }
  },
};

const sections = $$('main section[id]');

/** The section currently under the sticky header, or '' while still in the hero. */
function currentSectionId(): string {
  let current = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 140) current = section.id;
  }
  return current;
}

// — Theme toggle —
$$('[data-theme-toggle]').forEach((button) =>
  button.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    store.set('theme', dark ? 'dark' : 'light');
  }),
);

// — Language switcher: remember the choice and keep the reader on the same section —
$$<HTMLAnchorElement>('[data-lang-link]').forEach((link) =>
  link.addEventListener('click', () => {
    store.set('lang', link.dataset.langLink ?? '');
    const id = currentSectionId();
    const target = new URL(link.href);
    target.hash = id ? `#${id}` : '';
    link.href = target.href;
  }),
);

// — Mobile menu closes after choosing a destination —
$$<HTMLDetailsElement>('[data-mobile-menu]').forEach((menu) => {
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') menu.open = false;
  });
});

// — Active nav link —
const navLinks = $$<HTMLAnchorElement>('[data-nav-link]');
if (navLinks.length) {
  const navIds = new Set(navLinks.map((l) => l.dataset.navLink));
  let ticking = false;
  const update = () => {
    ticking = false;
    const id = currentSectionId();
    // Highlight the nearest nav section at or above the current one.
    let highlight = '';
    if (id) {
      for (const section of sections) {
        if (navIds.has(section.id)) highlight = section.id;
        if (section.id === id) break;
      }
    }
    // The CV block sits right above the contact block and shares its nav entry.
    if (id === 'cv') highlight = 'contact';
    navLinks.forEach((l) => (l.dataset.navLink === highlight ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

// — Filters (projects, publications) —
$$('[data-filter-scope]').forEach((scope) => {
  const state: Record<string, string> = {};
  const items = $$('[data-filter-item]', scope);
  const empty = scope.querySelector<HTMLElement>('[data-filter-empty]');

  $$<HTMLButtonElement>('[data-filter-key]', scope).forEach((button) =>
    button.addEventListener('click', () => {
      const key = button.dataset.filterKey ?? '';
      state[key] = button.dataset.filterValue ?? '';
      $$(`[data-filter-key="${key}"]`, scope).forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

      let visible = 0;
      for (const item of items) {
        const match = Object.entries(state).every(([k, value]) => !value || item.dataset[k] === value);
        item.hidden = !match;
        if (match) visible++;
      }
      if (empty) empty.hidden = visible > 0;
    }),
  );
});

// — Case-study dialogs —
$$('[data-dialog-open]').forEach((trigger) =>
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.dialogOpen ?? '');
    if (dialog instanceof HTMLDialogElement) dialog.showModal();
  }),
);
$$<HTMLDialogElement>('dialog').forEach((dialog) =>
  dialog.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    // A click on the <dialog> element itself is a click on the backdrop.
    if (target === dialog || target.closest('[data-dialog-close]')) dialog.close();
  }),
);

// — Copy to clipboard —
$$('[data-copy]').forEach((button) => {
  const label = button.querySelector<HTMLElement>('[data-copy-label]');
  const original = label?.textContent ?? '';
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
      if (label) {
        label.textContent = button.dataset.copiedLabel ?? original;
        setTimeout(() => (label.textContent = original), 2000);
      }
    } catch {
      /* clipboard blocked: the address stays visible and selectable */
    }
  });
});

// — Contact form (Formspree / Web3Forms: JSON response, no page reload) —
$$<HTMLFormElement>('form[data-ajax-form]').forEach((form) => {
  const success = form.querySelector<HTMLElement>('[data-form-success]');
  const error = form.querySelector<HTMLElement>('[data-form-error]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const idleLabel = submitLabel?.textContent ?? '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (success) success.hidden = true;
    if (error) error.hidden = true;
    if (submit) submit.disabled = true;
    if (submitLabel) submitLabel.textContent = submit?.dataset.sendingLabel ?? idleLabel;

    let ok = false;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      ok = response.ok;
    } catch {
      ok = false;
    }

    if (ok) form.reset();
    if (success) success.hidden = !ok;
    if (error) error.hidden = ok;
    if (submit) submit.disabled = false;
    if (submitLabel) submitLabel.textContent = idleLabel;
  });
});
