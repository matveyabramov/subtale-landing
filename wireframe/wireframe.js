(() => {
  'use strict';
  const heroBreakdown = document.querySelector('#hero-breakdown');
  function openHero(practice = false) {
    heroBreakdown.open = true;
    if (practice) {
      document.querySelector('#hero-practice').open = true;
      document.querySelector('#hero-practice-answer').open = false;
    }
    const target = document.querySelector(practice ? '#hero-practice-toggle' : '#hero-meaning-toggle');
    target.focus({ preventScroll: true });
    // Immediate, user-initiated reveal: the first click never waits for a scroll or animation.
    const content = practice ? document.querySelector('#hero-practice') : heroBreakdown;
    content.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  document.querySelector('.hero-cta').addEventListener('click', event => {
    event.preventDefault();
    openHero();
  });
  document.querySelectorAll('.dialogue-stage').forEach(stage => {
    const lines = [...stage.querySelectorAll('.scene-line')];
    const next = stage.querySelector('.scene-next');
    let current = 0;
    function showLine() {
      lines.forEach((line, index) => { line.hidden = current !== index; });
      stage.dataset.line = String(current);
      next.replaceChildren(document.createTextNode(current ? 'К началу диалога ↶' : 'Ответ героя →'));
    }
    showLine();
    next.hidden = false;
    next.addEventListener('click', () => { current = 1 - current; showLine(); });
  });
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('.example-panel')];
  function selectExample(id, focusTab = false) {
    tabs.forEach((tab, index) => {
      const selected = panels[index].dataset.example === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[index].hidden = !selected;
      if (selected && focusTab) tab.focus();
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
    const panel = panels[index];
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
  });
  selectExample('idiom');
  document.querySelector('.example-tabs').hidden = false;

  // Only this page's sample dialogues are saved, in memory. No product backend is implied.
  const titles = { cafe: 'It’s on me', idiom: 'Break the ice', irony: 'Great timing', reference: 'Sherlock' };
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
      open.textContent = id === 'cafe' ? `${titles[id]} — практика ↗` : `${titles[id]} ↗`;
      open.setAttribute('aria-label', id === 'cafe' ? `Попрактиковаться с фразой ${titles[id]}` : `Открыть разбор ${titles[id]}`);
      open.addEventListener('click', () => {
        if (id === 'cafe') {
          openHero(true);
          return;
        }
        selectExample(id, true);
        document.querySelector('.example-tabs').scrollIntoView({ block: 'start' });
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'saved-remove';
      remove.textContent = 'Убрать';
      remove.setAttribute('aria-label', `Убрать ${titles[id]} из выбранного`);
      remove.addEventListener('click', () => {
        toggleSave(id);
        // The removed button no longer exists: keep keyboard focus in the collection.
        (list.querySelector('button') || document.querySelector('[role="tab"][aria-selected="true"]')).focus();
      });
      item.append(open, remove);
      list.append(item);
    }
    document.querySelectorAll('[data-save]').forEach(button => {
      const active = saved.has(button.dataset.save);
      button.setAttribute('aria-pressed', String(active));
      const label = button.dataset.save === 'cafe' ? 'Сохранить для практики' : 'Оставить на потом';
      button.replaceChildren(document.createTextNode(active ? 'Убрать из выбранного' : label));
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = active ? '−' : '+';
      button.append(icon);
    });
    document.querySelector('.hero-saved-link').hidden = !saved.has('cafe');
  }
  function toggleSave(id) {
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    renderSaved();
    status.textContent = `${titles[id]} ${saved.has(id) ? 'добавлено в выбранное' : 'убрано из выбранного'}. Всего: ${saved.size}.`;
  }
  document.querySelectorAll('[data-save]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => toggleSave(button.dataset.save));
  });
  document.querySelector('.saved-moments').hidden = false;

  // Offer more examples in the header after the Hero action scrolls away.
  const headerAction = document.querySelector('.header-cta');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      headerAction.hidden = entry.isIntersecting || entry.boundingClientRect.top > 0;
    }, { rootMargin: '-90px 0px 0px 0px' });
    observer.observe(document.querySelector('.hero-cta'));
  }
})();
