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

## Full landing iteration — 2026-11-12 (supersedes the nine-section version)

Scope: the user's explicit instruction authorizes structural and interaction changes directly in main. Five sections now replace nine: Hero → contextual examples → viewing workflows → FAQ → final invitation. This overrides the earlier block-count/approval sequence for this iteration; historical documents above describe earlier versions.

Implemented:
- Concrete Hero offer around less translation searching and more attention to the story; removed eyebrow, audience tag, film/time labels and fake player chrome. The right side is a real native disclosure with an idiom and explanation.
- Three distinct, originally written mini-dialogues: idiom (break the ice), irony (great timing), cultural reference (Sherlock). These are teaching examples authored for this page, not quotations or clips attributed to films. Cultural interpretation preserves uncertainty where tone is ambiguous.
- Accessible example tabs with arrow/Home/End navigation, optional independent notes, native detailed explanations, volatile saved-example collection, reopen/remove controls and live announcements. All of these actually work locally; no product API or automatic assessment is simulated.
- One primary Hero action; its continuation appears in the sticky header only after the Hero action scrolls away. Navigation stays available on mobile. The final section uses a quieter text invitation rather than another primary button.
- Combined modes, process and comparison into two viewing workflows. The ordinary workflow is explicitly the case where translation is sought separately; no claim that all competing products require it. SUBTALE's full viewing flow is identified as intended, not implemented.
- Four FAQ entries cover actual availability, integrations, language suitability and release/price. No invented pricing, device support, efficacy, testimonials or automatic missed-meaning discovery.

Gridnev mapping: tone/value (03:33–08:48), Hero/CTA and excessive labels (10:50–21:55, 28:37–30:21), explanation before examples and multiple short examples (30:38–35:48), combined scenarios and language practice (35:59–45:35, 47:37–49:21), simplified comparison (49:21–52:06), non-repetitive FAQ (52:06–54:55), honest final promise (56:07–61:05). Source: gridnev-landing-1.srt; editorial rationale: docs/copy-audit.md. Russian Editorial was used for content/structure and Sasha for UI writing. Humanizer was not invoked.

Validation: headless installed Chrome via Playwright at 1440, 768, 390 and 320 px. Tested disclosure, tabs, Home/End and wraparound arrows, one visible panel, independent notes retained across tabs, save/un-save, three-item collection, reopening an item, removal including last-item focus recovery, header action visibility, skip link/focus, all four FAQ entries using keyboard, valid anchors and unique IDs. No visible text/page overflow; no browser console, script or resource errors. No-JS check: all three examples remain readable with native explanations; unavailable tab/save controls stay hidden. Desktop/mobile screenshots inspected. JS syntax and git diff --check pass.

Remaining: no licensed film/video examples were available for this iteration, so original interactive dialogue scenes replace video; there are no inert playback buttons. Playback, streaming integrations, automatic discovery, account-level persistence, learning-outcome measurement and actual product explanations are unimplemented. Notes/choices are deliberately page-memory only and are lost on reload. Browser checks use emulated viewports, not physical devices or Safari. No new dependencies, external services or changes to hosting configuration.

## Scratch-off and scene-led iteration — 2026-11-12

Seven sections now carry the sequence: offer → why context matters for English → illustrated interactive scenes → viewing workflows → transfer to a new conversation → viewer-focused FAQ → final invitation. Hero explicitly connects original-language viewing with English practice. Its right-hand cafe storyboard has three working frame controls, changing the context, subtitle, meaning and bill position; it is not presented as video playback.

The three original dialogues now have original grayscale SVG scene illustrations and sequential subtitles with a working next-line control. No film footage, video player or claimed integration is simulated. Textareas were removed. Each explanation sits below an actual canvas coating erased with destination-out strokes. Mouse, touch and pen use Pointer Events and pointer capture; a brush physically makes transparent holes. After 46% measured transparent coverage, the rest clears. Stroke coordinates are normalized and repainted on resize/tab revisit; an explicit reset restores the coating. Keyboard users can reveal the same semantic HTML via a button. Before reveal the answer is inert/aria-hidden; after reveal it is accessible, with a live announcement. Missing JavaScript or canvas support leaves readable answers. Touch scrolling is suppressed only on the scratch surface.

The new language-practice section shows break the ice in a different sentence; it does not promise memorization or fluency. FAQ addresses pacing, language difficulty, context and the place of film in learning. A single short access note keeps availability honest outside the FAQ. Selected examples remain page-memory only; persistent accounts, automatic explanations, full playback and integrations are not implemented.

Validation: installed headless Chrome, 1440/768/390/320 px; mouse erasing on desktop and real Chrome DevTools touch start/move/end events at mobile widths, including DPR 2. Measured partially cleared pixel fractions (about 23%, 9%, 12%, 7%) before full reveal; verified this was partial transparency, not a text toggle. Checked threshold completion, reset to opaque, keyboard Enter/Space alternative, hidden-answer accessibility state, preserved erasure after width change and tab switch, independent examples, hero frames, next-line controls, tabs, saved examples, sticky CTA, keyboard FAQ and anchor targets. No page/text overflow or console/resource errors. No-JS and null-canvas fallbacks passed. JS syntax and git diff --check passed; desktop/mobile screenshots and partial-erasure screenshots inspected. Tests use emulated touch/viewports, not physical phones or a screen reader. Safari/Firefox remain untested.

Gridnev's scratch suggestion at 45:59–47:31 is now implemented literally, without importing his speculative neuroscience explanation as product evidence. Content and UI were reviewed through the installed editorial skills; Humanizer was not invoked.
