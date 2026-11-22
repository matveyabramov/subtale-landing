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

## Hero and first-click review — 2026-11-21

Scope: the user's current request authorizes implementing the Hero copy and interaction directly in `main`. This supersedes the earlier copy-proposal approval gate for this iteration only. Existing section order, monochrome illustrations and the three examples remain in place. Russian Editorial was used for the offer and demonstration; Sasha for action labels. No Slot Machine or Humanizer pass was needed.

Observed before editing in installed Chrome at 1440 and 390 px: the Hero's “Попробовать разбор” scrolls smoothly to `#demo`, where the first visible line is “Nobody’s saying a word.” The cafe storyboard is independent. There is no autoplay: only the bill has a 250 ms transform transition after a frame click. The CTA does not focus a demo control. This makes the two apparent entry points lead to different material.

Two first-click hypotheses were compared by walking their interaction paths, not through a user study:

| Scenario | Path to the meaning | Decision |
|---|---|---|
| Keep the three frames with explicit labels | Browser-only labels: “1. Посмотреть ситуацию”, “2. Услышать ответ”, “3. Узнать смысл”. The ordered path needs two clicks after the opening frame; clicking meaning directly skips the target phrase. | Clearer labels help, but the introductory coffee question still delays the useful example. |
| Start with “It’s on me” | Context and target phrase are present initially; one click opens the explanation. | Implemented. The introductory situation fits in the scene caption. |

Hero now leads with understanding a line and returning for practice. Its named CTA and native “Показать смысл реплики” disclosure reach the same explanation. Opening the CTA moves keyboard focus to that disclosure and uses immediate nearest scrolling, preserving the scene when it fits. There are no timed steps or Hero animation. Without JavaScript the CTA jumps to the native disclosure, which the visitor opens normally.

The cafe phrase can be saved to the existing page-memory collection. Its collection entry opens an optional practice prompt about lunch; the answer starts closed on each return. Saving does not persist across reloads. “Ещё 3 примера разбора” and the revised example introduction connect the Hero to the existing idiom, irony and reference scenes. The sticky action is explicitly “Ещё примеры”. Full viewing, automatic explanations and a product backend remain unimplemented.

Validation: installed headless Chrome, 1440×1000 desktop and 390×844 with iPhone touch/viewport emulation. Walked fresh Hero CTA and native disclosure; save, collection, practice, answer, return with answer reset, un-save; all three example tabs, next lines, reveal/reset, save and saved-item reopening. Checked tab arrow wrapping/End, keyboard Enter/Space on Hero and every FAQ, visible focus outlines, reduced motion and no-JS fallback. No horizontal/text overflow or browser script/console/resource errors. Desktop/mobile initial, revealed and practice screenshots inspected. JS syntax and `git diff --check` passed. This is functional/editorial verification, not evidence of improved conversion; physical devices, Safari and screen-reader output were not tested.

## Beta signup landing — 2026-11-21

The current user brief changes the page's goal to beta signup and explicitly authorizes the copy, structure and implementation changes in `main`. The approved Hero heading and both paragraphs are inserted verbatim, including future tense, and checked against exact browser text. Its right-hand cafe illustration is now a static product mockup with an English subtitle, an open explanation and a non-interactive “Отметить на потом” affordance. “Посмотреть пример” reaches the scenes and focuses their heading immediately.

The resulting sequence is Hero → three scenes → viewing choices and practice → beta FAQ → final signup. The separate context-benefit section and the comparison with external translation workflows were removed as requested. Their useful meaning is carried by the scenes: each tab shows both dialogue lines from the start, including the target expression. The single explanation under each coating now covers both meaning and the speaker's purpose. Mouse/touch erasing and “Показать объяснение” expose that same semantic HTML; reset restores its inaccessible covered state.

Russian Editorial guided the content; Sasha guided form and action labels. Slot Machine compared two independently written arrangements for viewing/practice, followed by fresh reviews and an independent judge:

| Candidate | Findings | Decision |
|---|---|---|
| One section: two viewing choices converge on saved expression and optional practice | Review PASS; two localized corrections: explicitly continue watching in the delayed branch, and visibly label the static future-collection example. | PICK, high confidence; both corrections applied. |
| Separate viewing and practice sections | Its “different conversation” repeated the original new-team situation, without a new interlocutor or purpose. Review FAIL; judge verified the gap and also required a visible static-example label. | Not selected. |

The winner keeps the choices equal rather than numbered as required steps. After them, the visitor can recall the original `break the ice` scene and use the expression to advise a worried friend. The optional example opens through native disclosure without grading. “Как будет выглядеть сохранённое выражение” labels this static illustration; the actual marked-dialogue list retains the separate note that choices last only while the page stays open. Humanizer was not needed. This comparison is editorial judgment, not user research or conversion evidence.

Exactly three “Записаться на бета-тест” links share one form: Hero, sticky header after Hero, and final section. JavaScript presents that same form in a native modal with name/email fields, required/email validation, a close action, Escape support and opener-focus restoration. Without JavaScript it stays inline at the anchor; its submit control is disabled. The modal explicitly says “Демоформа”, explains future invitations and states that collection is not connected. Its action validates only; the status explicitly says no application was sent. No endpoint, POST, analytics payload, account, persistent storage or invitation delivery was added. Field contents are cleared on close. FAQ and the final invitation repeat the actual availability accurately.

Validation: installed Chrome at 1440×1000 and 390×844 with mobile/touch emulation, plus layout/form checks at 768 and 320 px. Verified exact approved text, section order, all three entries into the same form, empty/invalid/valid fields, no submission request, close/Escape, native modal isolation and focus restoration. Tested immediate scene navigation, initial target lines on all tabs, arrow wrapping/End and visible focus, button reveal/reset, actual partial erasure and completion by desktop mouse and CDP touch strokes on all three scenes. Partial coverage measured 4% on desktop and 2% on mobile before further strokes completed reveal; transparent pixels were measured on the canvas, not inferred from text changes. Checked marking/reopening samples, practice disclosure, its return link selecting the idiom, every FAQ, sticky CTA visibility, reduced motion and no-JS fallbacks. No page/text overflow or script/console/resource errors; no non-GET requests. Desktop/mobile Hero, form, scene, practice and full-page screenshots inspected; JS syntax and `git diff --check` passed. Physical phones, Safari and screen-reader output remain untested.

Reference limitation: no new long screenshot was attached to this message. Work was checked against the current source, the earlier supplied Hero image, and freshly rendered desktop/mobile screenshots. Hosting and public publication settings were not changed.

## Context, interpretation and viewing sequence — 2026-11-22

Source: the user-supplied `Subtale аудит лендинга.md`, dated 22 November 2026, was read and compared with the current build. Its recommendations were treated as review material; the current user brief controls scope and resolves conflicts. Russian Editorial guided the content and Sasha the interaction labels. The already selected unified viewing/practice arrangement was refined into explicit before/after phases; a new Slot Machine run was unnecessary because this brief specifies that sequence. Humanizer was not needed.

| Audit recommendation | Current-build finding and decision |
|---|---|
| §3.2: the Hero mockup reads as a card; add a timeline and explain a reaction | Replaced the cafe/payment card with an illustrated paused viewing screen: English subtitle, timeline, marked moment and short contextual hint. The original reference-scene SVG is reused. “All right, Sherlock” is explained as a teasing reaction to an obvious clue. “Сцена-пример” identifies the illustration honestly. The static screen has no fake playback or seek buttons. |
| §3.2: change H1 and remove the approved Hero paragraphs | Not adopted: the user explicitly requires the approved text unchanged. Browser checks compare the H1 and both paragraphs verbatim. |
| §3.3: interpretation before explanation, supported by the scene | The irony example now centers on the standalone “Great timing.” The closed lift, heavy bags and glance at the stairs support the ironic reading; the explanation contrasts it with a sincere reading in another context. Two native radio choices are optional. After revealing, the visitor can compare the selected reading with that same explanation. The Hero uses a different scene so it does not disclose this answer in advance. |
| §§2–3.3: require a choice or remove one reveal method | Not adopted: the user explicitly preserves direct scratching and “Показать объяснение”. The button now appears above the coating, beside the interpretation area. No choice, score, submit action or preliminary step gates either reveal path. |
| §§3.4–3.5: connect viewing to the post-film breakdown | Added explicit “01 / Во время фильма” and “02 / После фильма” phases. Immediate hints and marking are alternatives within viewing. Afterwards the sequence is returning to scenes → discovering potentially missed meaning → collecting and repeating useful expressions. Proposed features retain future framing. |
| §3.5: ready-made phrase is described as a practice task | The retained `break the ice` example is now a concrete birthday-party conversation. The disclosure is accurately named “Посмотреть, как сказать в другой ситуации”; FAQ describes viewing an example. The user requested practice, so the audit's proposed removal was not adopted. |
| §§3.6–3.7: check the hidden header CTA and form claims | All three existing CTAs reach one native modal. Header action is hidden in Hero and shown after it, including direct scene navigation. Collection remains disconnected: the demo label, explanation and validation-only action are retained. No application confirmation is displayed; valid fields produce only the explicit “заявка не отправлена” status. |
| §§3.3, 5.2: add the Dzen pilot and its numbers | No Dzen URL exists in tracked project files or Git history; the supplied audit names the pilot but gives no address or primary results. No URL, pilot statistics or educational-level claim was invented or published. |

Interpretation state is local to the page and persists across tab switches. A small `scratchchange` event connects the canvas's existing reveal/reset state with the optional comparison. Before reveal the comparison stays hidden, including after a radio choice. Reset covers the same answer and hides the comparison while keeping the selected version. Both reveal methods expose the same single semantic HTML answer. Without canvas support the answer stays visible and the comparison still works; without JavaScript all three scenes and their answers remain readable.

Files: `index.html` (player mockup, optional choices, copy and phase sequence), `wireframe.css` (player/choice/phase layouts), `wireframe.js` (local interpretation comparison), `scratch-off.js` (reveal/reset notifications), and this log. No backend, external form destination, persistent storage, analytics, brand redesign or hosting settings were added.

Validation: installed Chrome at 1440×1000 and 390×844 with mobile/touch emulation. Checked approved Hero text verbatim; the final distinct Hero scene and its marker; Hero example navigation selecting the irony tab; no-choice button reveal; both interpretations; feedback only after reveal; tab revisit retaining the choice; keyboard radio arrows, tab navigation and visible 3px focus; reset; and real mouse/touch erasure exposing the identical answer. Partial transparent coverage measured 4% desktop and 2% mobile before completing reveal. Checked the other two explanations, marking/reopening samples, the birthday example and idiom return link, FAQ, and all three entries into the single demo form. Empty/invalid/valid field states, Escape/close and absence of submission requests passed; no accepted-application message is shown. No script/console/resource errors or horizontal/text overflow. Additional 768 and 320 px layout/form checks, reduced motion, no-JS and no-canvas fallbacks passed. Initial Hero, player, choice/answer, sequence and full-page screenshots inspected. JS syntax, unique IDs/anchor targets and `git diff --check` passed. Physical devices, Safari and screen-reader output were not tested.
