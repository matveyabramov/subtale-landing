(() => {
  'use strict';
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('.example-panel')];
  function selectExample(id, focusTab = false) {
    tabs.forEach((tab, index) => {
      const selected = panels[index].dataset.example === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[index].hidden = !selected;
      if (selected && focusTab) tab.focus({ preventScroll: true });
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectExample(panels[index].dataset.example));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectExample(panels[next].dataset.example, true);
      }
    });
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
  });
  selectExample('idiom');
  document.querySelector('.example-tabs').hidden = false;

  // Choosing an interpretation is optional and never gates the shared explanation.
  const ironyPanel = document.querySelector('#panel-irony');
  const interpretation = ironyPanel.querySelector('.interpretation-choice');
  const comparison = ironyPanel.querySelector('.interpretation-feedback');
  const ironyCard = ironyPanel.querySelector('[data-scratch]');
  function compareInterpretation() {
    const selected = interpretation.querySelector('input:checked');
    const exposed = ironyCard.dataset.revealed !== 'false';
    comparison.hidden = !selected || !exposed;
    comparison.textContent = selected && exposed
      ? selected.value === 'ironic'
        ? 'Твоя версия совпала с разбором: герой досадует из-за уехавшего лифта.'
        : 'Твоя версия — искренняя радость. В разборе — ирония: лифт уехал, а герою предстоит нести сумки по лестнице.'
      : '';
  }
  interpretation.addEventListener('change', compareInterpretation);
  ironyCard.addEventListener('scratchchange', compareInterpretation);

  document.querySelectorAll('a[href="#demo"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (link.dataset.exampleLink) selectExample(link.dataset.exampleLink);
      document.querySelector('#demo-title').focus({ preventScroll: true });
      document.querySelector('#demo').scrollIntoView({ block: 'start', behavior: 'instant' });
      history.replaceState(null, '', '#demo');
    });
  });

  // Sample choices live only in this page's memory, independently of the beta form.
  const titles = { idiom: 'Break the ice', irony: 'Great timing', reference: 'Sherlock' };
  const saved = new Set();
  const list = document.querySelector('#saved-list');
  const status = document.querySelector('#save-status');
  function renderSaved() {
    list.replaceChildren();
    document.querySelector('#saved-empty').hidden = saved.size > 0;
    for (const id of saved) {
      const item = document.createElement('li');
      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'saved-open';
      open.textContent = `${titles[id]} ↗`;
      open.setAttribute('aria-label', `Открыть разбор ${titles[id]}`);
      open.addEventListener('click', () => {
        selectExample(id, true);
        document.querySelector('.example-tabs').scrollIntoView({ block: 'start', behavior: 'instant' });
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'saved-remove';
      remove.textContent = 'Убрать';
      remove.setAttribute('aria-label', `Убрать ${titles[id]} из отмеченного`);
      remove.addEventListener('click', () => {
        toggleSave(id);
        (list.querySelector('button') || document.querySelector('[role="tab"][aria-selected="true"]')).focus();
      });
      item.append(open, remove);
      list.append(item);
    }
    document.querySelectorAll('[data-save]').forEach(button => {
      const active = saved.has(button.dataset.save);
      button.setAttribute('aria-pressed', String(active));
      button.replaceChildren(document.createTextNode(active ? 'Убрать из отмеченного' : 'Отметить на потом'));
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = active ? '−' : '+';
      button.append(icon);
    });
  }
  function toggleSave(id) {
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    renderSaved();
    status.textContent = `${titles[id]} ${saved.has(id) ? 'добавлено в отмеченное' : 'убрано из отмеченного'}. Всего: ${saved.size}.`;
  }
  document.querySelectorAll('[data-save]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => toggleSave(button.dataset.save));
  });
  document.querySelector('.saved-moments').hidden = false;

  const headerAction = document.querySelector('.header-cta');
  if ('IntersectionObserver' in window) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const anchorGap = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const heroBoundary = Math.max(headerHeight, anchorGap) + 1;
    new IntersectionObserver(([entry]) => {
      headerAction.hidden = entry.isIntersecting || entry.boundingClientRect.bottom > heroBoundary;
    }, { rootMargin: `-${heroBoundary}px 0px 0px 0px` }).observe(document.querySelector('.hero'));
  }

  // One native modal shared by all three CTAs; the same form stays inline without JS.
  const signup = document.querySelector('#beta-signup');
  const form = document.querySelector('#beta-form');
  const formStatus = document.querySelector('#beta-status');
  const name = document.querySelector('#beta-name');
  const dialog = document.createElement('dialog');
  dialog.className = 'signup-dialog';
  dialog.setAttribute('aria-labelledby', 'beta-title');
  dialog.setAttribute('aria-describedby', 'beta-intro beta-demo-note');
  document.body.append(dialog);
  dialog.append(signup);
  const close = signup.querySelector('.signup-close');
  close.hidden = false;
  form.querySelector('[type="submit"]').disabled = false;
  let opener;
  document.querySelectorAll('[data-beta-open]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      form.reset();
      name.setCustomValidity('');
      formStatus.textContent = '';
      dialog.showModal();
      document.body.classList.add('modal-open');
      name.focus();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    form.reset();
    formStatus.textContent = '';
    opener?.focus({ preventScroll: true });
  });
  form.addEventListener('input', () => {
    name.setCustomValidity('');
    formStatus.textContent = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    name.setCustomValidity(name.value.trim() ? '' : 'Укажи имя.');
    if (!form.reportValidity()) return;
    // Intentionally no endpoint, network request, analytics payload or persistence.
    formStatus.textContent = 'Поля заполнены верно. Это демо: заявка не отправлена, сбор пока не подключён.';
  });
})();
