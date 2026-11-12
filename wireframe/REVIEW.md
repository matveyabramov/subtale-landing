# SUBTALE wireframe v0.2 — проверка 6 ноября 2026

Доработка существующего HTML-wireframe. Все изменения находятся внутри `/wireframe/`; корневая страница и девять блоков структуры v2.1 сохранены.

## Изменения

- Уточнены пропорции сетки, отступы, размеры и переносы заголовков. Inter Regular следует шкале SD-M: H1 до 90 px, H2 до 66 px, H3 26 px, основной текст 18 px.
- Добавлен локальный variable-шрифт Inter с кириллицей и лицензией SIL OFL (`fonts/`). Внешние шрифтовые сервисы и библиотеки не подключаются.
- Градиенты и декоративные рамки плейсхолдеров заменены плоскими серыми поверхностями. Сохранён низкий уровень детализации.
- Сравнение на телефоне представлено последовательными карточками строк таблицы с названиями подходов; горизонтальная прокрутка не требуется. Семантика таблицы и связи заголовков сохранены.
- Вместо изображения поля в примере сцены добавлено настоящее текстовое поле. Ввод остаётся на странице: нет отправки, оценки или сохранения на сервере. Пояснение раскрывается отдельным действием.
- Усилены контраст подписей и видимость клавиатурного фокуса; добавлен переход к основному содержанию.
- Черновые тексты не переписаны. Из текстовых изменений — номер версии и вспомогательные подписи для доступности. Оговорки о концепции, гипотезе автопоиска и неподтверждённой совместимости сохранены.

## Figma-референсы

Изучены через Figma MCP, без изменения исходных библиотек:

- [SD-M / типографика, 3:72](https://www.figma.com/design/R0DPBw0LdQMhTqtGCoDyiG/?node-id=3-72): Inter Regular, шкала размеров и монохромные элементы UI-кита.
- [Ed School / композиция, 42:147](https://www.figma.com/design/z56O7WXjQDHcxvP1DrxekA/?node-id=42-147): крупная типографика, свободная композиция и простые прямоугольные блоки.
- [Ed School / мобильный экран, 54:410](https://www.figma.com/design/z56O7WXjQDHcxvP1DrxekA/?node-id=54-410): вертикальная последовательность заголовка, описания и медиа-плейсхолдера.

Это композиционные референсы: шаблоны и чужой контент не импортированы.

## Проверено

Локально через `python3 -m http.server 8000 --bind 127.0.0.1`, Playwright и установленный Google Chrome в headless-режиме; ширины 1440 и 390 px, высота окна 900 px. Просмотрены скриншоты всех девяти блоков на обеих ширинах, включая раскрытые сцену и FAQ.

| Проверка | 1440 px | 390 px |
| --- | --- | --- |
| Девять секций в исходном порядке, один H1 | Пройдено | Пройдено |
| Ширина документа равна ширине окна | 1440 px | 390 px |
| Переполнение видимого контента | Нет | Нет |
| Рабочие якорные ссылки | Пройдено | Пройдено |
| Видимый фокус доступных элементов | 16 элементов | 13 элементов |
| Ввод трактовки и раскрытие без потери ввода | Пройдено | Пройдено |
| Раскрытие/закрытие сцены через Enter/Space | Пройдено | Пройдено |
| Все пять FAQ через Enter/Space | Пройдено | Пройдено |
| Локальная загрузка Inter | Пройдено | Пройдено |
| Ошибки страницы и консоли | Нет | Нет |

Проверен переход с корневой страницы на `/wireframe/`. Программно сопоставлен текст с предыдущим коммитом: основной черновой контент сохранён. `git diff --check` — без ошибок.

Проверка ограничена Chrome; Safari, Firefox и физические мобильные устройства не проверялись. Это прототип интерфейса: просмотр видео, интеграции и автоматическое обнаружение смыслов не реализованы. Развёртывание и настройки GitHub Pages не выполнялись.

## Copy revision — 2026-11-12

Implemented directly in main, from 606598b, following docs/copy-audit.md and the user's instruction to edit the live HTML rather than prepare another approval document.

- Replaced the hidden-meaning pitch with cinema in English, contextual language practice, and help during/after viewing. Removed blame, command-heavy headings and the guaranteed next-film outcome.
- Kept all nine sections and existing styling. The two-card section now contrasts during/after viewing; it no longer promises automatic discovery.
- All three primary CTAs say “Посмотреть пример” and link to the working #scene example. The answer remains optional and is not presented as an automated assessment.
- Comparison describes overlapping workflows, with planned SUBTALE behavior explicitly identified. FAQ distinguishes the working on-page example from planned playback, explanations and saved moments; no platforms, prices, launch dates or required language level were invented.
- Used Russian Editorial for substantive editing and Sasha for CTA, field labels and FAQ. Humanizer was not invoked.

Validation: local headless Chrome via Playwright at 1440, 768, 390 and 320 px. Nine sections, one H1, no broken anchor targets, no horizontal page overflow or overflowing text containers, including expanded scene/FAQ. Checked all three CTAs, textarea entry and persistence while toggling the explanation, mouse/keyboard reveal, all five FAQ toggles, visible keyboard focus/skip link, reduced-motion behavior and resource/console errors. Inspected desktop/mobile screenshots. CSS, fonts, table semantics, section IDs and existing native interactions are preserved. git diff --check passed.

Limits: viewport checks are browser emulation, not physical-device or Safari testing. Media areas remain visual placeholders. Full playback, platform compatibility, saved moments, explanation quality, educational outcomes and release conditions remain product questions; this copy revision does not implement them. The historical copy audit describes the previous version and is retained as the rationale, not a report of current defects.
