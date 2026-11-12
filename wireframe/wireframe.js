(() => {
  'use strict';
  const frames = [
    { setting: 'После прогулки друзья заходят в кафе.', line: '“Shall we get some coffee?”', meaning: '«Может, выпьем кофе?»' },
    { setting: 'Один из друзей берёт счёт.', line: '“Sure. It’s on me.”', meaning: 'Знакомые слова. Какой смысл у целой фразы?' },
    { setting: 'Он предлагает заплатить за обоих.', line: '“It’s on me.”', meaning: '«Я угощаю». Так можно предложить оплатить кофе или обед.' }
  ];
  const story = document.querySelector('.hero-story');
  const frameButtons = [...document.querySelectorAll('[data-frame]')];
  frameButtons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.frame);
    story.dataset.step = String(index);
    document.querySelector('#hero-setting').textContent = frames[index].setting;
    document.querySelector('#hero-frame-count').textContent = `${index + 1} / 3`;
    document.querySelector('#hero-line').textContent = frames[index].line;
    document.querySelector('#hero-meaning').textContent = frames[index].meaning;
    frameButtons.forEach((item, i) => item.setAttribute('aria-pressed', String(index === i)));
  }));
  document.querySelector('.story-controls').hidden = false;
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
      button.replaceChildren(document.createTextNode(active ? 'Убрать из выбранного' : 'Оставить на потом'));
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = active ? '−' : '+';
      button.append(icon);
    });
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

  // A single primary action on the first screen; continue it in the header after scrolling.
  const headerAction = document.querySelector('.header-cta');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      headerAction.hidden = entry.isIntersecting || entry.boundingClientRect.top > 0;
    }, { rootMargin: '-90px 0px 0px 0px' });
    observer.observe(document.querySelector('.hero-cta'));
  }
})();
