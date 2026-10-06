Status: ready-for-agent

# Завершение сайта «Ресурсный центр»

## Problem Statement

Публичная часть сайта «Ресурсный центр» имеет готовую визуальную основу и набор общих компонентов C01–C08, но ещё не содержит документные сценарии, полноценную ленту публикаций, статью, контакты и остальные согласованные страницы. Сейчас основные маршруты остаются заглушками, значительная часть макетов не собрана, а переходы, query/hash-навигация и состояния данных нельзя проверить сквозным пользовательским сценарием.

Перед продолжением фактическая проверка подтвердила C09 как следующий этап: lint, проверка типов и production-сборка проходят, однако автоматических тестов в репозитории нет. В ранее завершённых компонентах обнаружены три расхождения с исходными контрактами: уведомление может объявляться при первоначальном появлении, карточки услуг не обеспечивают разрешённый список маршрутов своим контрактом, а ограничения количества принципов и шагов не закреплены.

Реальные фотографии, документы, видео, контакты, юридические тексты и внешние интеграции пока отсутствуют. Они не должны блокировать сборку и проверку сайта: в явно включаемом режиме предпросмотра используются безопасные локальные моки, которые позднее можно заменить реальными данными. CMS управляет только публикациями; остальные данные остаются встроенными согласно утверждённому дизайну.

## Solution

Завершить оставшиеся общие компоненты C09–C13, собрать все страницы P01–P15 и выполнить итоговую проверку Q01, сохраняя существующий визуальный язык, структуру Nuxt-приложения, Tailwind-тему и доступное поведение C01–C08.

Публикации должны поступать через единый типизированный контракт источника. В режиме предпросмотра контракт обслуживается двенадцатью согласованными моковыми публикациями; впоследствии тот же контракт подключается к существующей CMS без переделки страниц. Режим предпросмотра включается конфигурацией окружения для всего развёртывания. Ошибка CMS никогда не включает моки автоматически.

Отсутствующие материалы и интеграции представлены в предпросмотре безопасными моками через те же публичные контракты, которые будут использовать реальные данные. Такие моки явно обозначаются как демонстрационные, не заявляют фактическую или юридическую достоверность и не выполняют внешних действий. Вне режима предпросмотра отсутствие материала показывается честным недоступным состоянием.

## User Stories

1. As a visitor, I want every page to use the public name «Ресурсный центр», so that I am not confused by the technical project name.
2. As a visitor, I want a consistent header, main area, footer, typography and controls, so that the entire site feels like one coherent service.
3. As a keyboard user, I want all menus, links, controls, dialogs, accordions and forms to have predictable focus behavior, so that I can use the site without a pointer.
4. As a zoomed-in user, I want the site to reflow at 200% and down to 320 CSS pixels without horizontal scrolling, so that content remains readable.
5. As a screen-reader user, I want status messages to be announced only when state changes, so that initial page reading is not interrupted by redundant announcements.
6. As a visitor, I want service cards to lead only to the four supported services, so that I never reach an invented or unsupported route.
7. As an editor, I want principle and process components to accept only their agreed content shapes, so that page composition cannot silently diverge from the design.
8. As a visitor, I want document rows to distinguish reading on the site from downloading a file, so that I understand which formats are actually available.
9. As a visitor, I want an unavailable document action to be visibly unavailable and not rendered as an empty or fake link, so that I do not try to follow it.
10. As a visitor, I want to open a text version of a document without requiring a PDF, so that important information remains accessible.
11. As a visitor, I want the selected document reflected in the URL, so that I can bookmark and share it.
12. As a visitor, I want browser back and forward to restore the previously selected document, so that navigation behaves normally.
13. As a keyboard user, I want an explicit document selection to move focus to the reader heading, so that the changed content is apparent.
14. As a visitor, I want an unknown document identifier to produce a clear unavailable state, so that the site does not silently show the wrong document.
15. As a visitor, I want to select a reporting year with a native labelled control, so that the interaction works across input methods.
16. As a visitor, I want the selected reporting year reflected in the URL and report panel, so that the visible report always matches the address.
17. As a visitor, I want browser history to restore the previous reporting year, so that changing years behaves like normal navigation.
18. As a screen-reader user, I want a concise announcement after changing the reporting year, so that I know which report is displayed.
19. As a visitor, I want the report archive to show every other available year without duplicating the selected one, so that the distinction between current and archived reports is clear.
20. As a visitor, I want publication pagination to use real URLs, so that I can open, refresh and share any valid archive page.
21. As a visitor, I want six publications per archive page, so that the listing matches the agreed composition.
22. As a visitor, I want previous and next controls to become non-links at archive boundaries, so that they do not misleadingly reload the same page.
23. As a visitor, I want an invalid archive page value normalized to the first page and its URL corrected, so that malformed links recover predictably.
24. As a visitor, I want an archive page beyond the available range to show an honest absence state, so that the site does not invent content.
25. As a visitor, I want pending, empty, error and retry states for publication collections, so that failures are understandable and recoverable.
26. As a visitor, I want to return from an article to the archive page and approximate list position I came from, so that I can continue browsing.
27. As an editor, I want CMS publication metadata such as total, page and page count preserved by the frontend source contract, so that the UI does not guess pagination.
28. As an editor, I want existing string article content to remain safe plain text, so that richer preview layouts do not require unsafe HTML or an immediate CMS migration.
29. As a visitor, I want an article to have one H1 and structured H2 sections, so that its hierarchy is understandable.
30. As a visitor, I want the article table of contents to link only to headings that exist, so that every navigation action has a real target.
31. As a visitor, I want images, quotations, lists and video sections to remain part of the reading flow on mobile, so that content is not lost on smaller screens.
32. As a visitor, I want video never to autoplay, so that playback remains under my control.
33. As a visitor, I want a missing real video represented by a clearly labelled demonstration or unavailable state, so that a poster is not mistaken for a working player.
34. As a visitor, I want a transcript disclosure with a clear expanded state, so that I can access a text alternative to video.
35. As a visitor, I want captions and audio description controls shown only when corresponding materials exist, so that controls are truthful.
36. As a visitor, I want contact details to distinguish confirmed links from demonstration or unknown values, so that I do not act on invented information.
37. As a visitor, I want the contact form to require email, message and consent while leaving name optional, so that only necessary information is collected.
38. As a visitor, I want form errors summarized and linked to their fields, so that I can correct them efficiently.
39. As a visitor, I want my entered values preserved during submission and after a simulated or real network error, so that I do not have to retype my message.
40. As a visitor, I want repeated submission disabled while a request is pending, so that duplicate messages are avoided.
41. As a visitor, I want a real success message only after server confirmation, so that the site never falsely claims delivery.
42. As a preview reviewer, I want deterministic mock success, error and delay states, so that every form state can be inspected without an external endpoint.
43. As a privacy-conscious visitor, I want personal data excluded from URLs, console output and persistent browser storage, so that my message is not exposed.
44. As a visitor arriving from a service, training program or cooperation CTA, I want the selected topic shown above the message field, so that I understand the context of my enquiry.
45. As a visitor, I want only allowlisted service, program and topic values accepted from the URL, so that arbitrary query content cannot be rendered into the page.
46. As a visitor, I want a route description and map to supplement each other, so that directions are not conveyed by an image alone.
47. As a visitor, I want no geolocation request or active route link when no confirmed address exists, so that the site does not imply a real office location.
48. As a preview reviewer, I want demonstration content enabled for the whole deployment by environment configuration, so that every route uses a consistent data set.
49. As a preview reviewer, I want every demonstration page visibly labelled and excluded from indexing, so that mock content cannot be mistaken for a publication-ready site.
50. As an operator, I want an external service failure never to activate mock data automatically, so that production failures remain visible.
51. As a future integrator, I want mock and real publication sources to implement the same contract, so that CMS data can replace mocks without rewriting pages.
52. As a visitor, I want the home page to present the hero, centre overview, team, three latest publications and contact band in the agreed order, so that the primary story matches the design.
53. As a visitor, I want the About page to explain the centre, its three directions, team and related pages without invented biographies or metrics, so that the content remains credible.
54. As a visitor, I want the Mission page to present principles, a quotation, a three-step process and a cooperation action, so that the mission leads to a clear next step.
55. As a visitor, I want the Documents page to list the three agreed documents and provide a deep-linkable reader, so that documents can be read even before files are supplied.
56. As a visitor, I want the Reports page to switch among 2025, 2024 and 2023 and show the matching report structure, so that reporting years are clearly separated.
57. As a visitor, I want the Services page to show exactly four services and the agreed process, so that no unsupported offer is implied.
58. As a visitor, I want the Local Documents service page to preserve its result block, two FAQs and contact context on mobile, so that essential information is not hidden.
59. As a visitor, I want the ODI service page to explain its four steps without an invented FAQ or extra service, so that its scope is precise.
60. As a visitor, I want the Project Review service page to show two initially closed FAQs without promising guaranteed approval, so that expectations remain realistic.
61. As a visitor, I want the Accessibility Passport page to show preparation, result, four steps and four FAQs, so that the service process is complete.
62. As a visitor, I want the Training page to show exactly three programs and their enquiry links without dates, prices or course pages, so that unavailable capabilities are not implied.
63. As a visitor, I want the News archive to show six publication cards per page and real collection states, so that I can browse available publications reliably.
64. As a visitor, I want publication detail pages to preserve existing slug-based loading, 404 and service-error behavior, so that existing CMS behavior is not regressed.
65. As a visitor, I want the primary demonstration article to include its complete agreed text, contents, two images, quotation, video section and related publications, so that the article design can be fully reviewed.
66. As a visitor, I want the NGO page to show three support areas, three materials and a three-step cooperation path without invented detail pages, so that the whole offer is visible in one place.
67. As a visitor, I want the Contacts page to show contact details, entrance, directions and one responsive form instance, so that content order changes without duplicated fields.
68. As a visitor, I want a legal route and personal-data anchor to exist even while final legal copy is unavailable, so that consent links always have a truthful destination.
69. As a visitor, I want page titles, descriptions, breadcrumbs and canonical URLs to match the actual page and archive selection, so that navigation and search metadata are coherent.
70. As a maintainer, I want all fifteen primary routes and the legal and error routes to reuse shared components, so that fixes do not require page-specific duplication.

## Implementation Decisions

- Preserve the existing Nuxt, Vue, TypeScript and Tailwind stack. Extend the current theme and component families instead of introducing a new component library or parallel styling system.
- Preserve the established visual language: light surfaces, ink text, blue accent, compact header, small radii, restrained shadows, existing spacing and explicit responsive thresholds. Do not revisit the visual direction unless implementation exposes a direct contradiction.
- Before C09, correct the three verified carry-over issues: change announcements must not fire solely because an alert mounted; service-related cards must enforce the four supported destinations; principle and process components must enforce or explicitly reject unsupported item counts.
- Implement the remaining component sequence C09–C13 before assembling dependent pages.
- C09 provides four reusable capabilities: document rows, an on-page document reader, report-year selection and a report panel. Reading and downloading are separate actions. Unknown document and year values produce explicit states rather than silent fallback.
- Document selection uses a query value plus a real reader anchor. Explicit selection moves focus to the reader heading; browser history restores the selected document.
- Report-year selection uses a native select, stores the chosen year in the query, leaves focus on the select and updates both the report panel and archive. The supported preview years are 2025, 2024 and 2023, newest first.
- C10 provides publication collection states and pagination. The first archive page uses the base news URL and later pages use a `page` query value. Page size is six; the UI never manufactures page counts.
- Invalid nonnumeric or negative archive values normalize to page one with URL correction. A numeric page beyond the available range remains an honest unavailable-page state.
- The publication source contract returns items together with pagination metadata. The existing CMS adapter must preserve metadata rather than return only an array. Client-side slicing of a partially fetched CMS result is not allowed.
- C11 introduces a presentation model for ordered article blocks: paragraphs, headings, images, quotations, lists and video. Existing CMS string content remains supported through an explicit adapter and is rendered as safe text.
- A publication is the single domain entity. «Новости» is its archive; «статья» is the detailed representation, not a separate CMS entity.
- Article metadata supports publication date and optional author. Cover media remains separate from body blocks. Body sections start at H2 and the reading column remains deliberately narrow.
- Video uses native accessible controls or a verified titled embed only when a real source exists. Preview may use a clearly labelled mock state, but must not imitate autoplay, duration, captions or delivery that are not present.
- C12 provides contact details and a single contact form. Name is optional and limited to 100 characters; email is required and limited to 254; message is required after trimming and limited to 5000; consent is required and never preselected.
- Form submission states are idle, invalid, pending, success and server error. Error summary receives focus after an invalid submit and links to affected fields. Pending preserves values and blocks duplicate submission. Network errors preserve values and permit retry.
- The form talks to an injected submission adapter. Preview uses a deterministic local adapter for delay, error and mock-success demonstrations with no external request. Production success is impossible without confirmation from a real endpoint.
- C13 centralizes location presentation, CTA URL construction, allowlist parsing and preview data selection. Query precedence is service, then program, then general topic. Unknown values are ignored and personal data is never included in the URL.
- The four services and three training programs remain fixed domain definitions. Programs do not receive separate detail routes.
- CMS ownership remains limited to publications. Navigation, services, programs, page copy, document/report structures and other design content remain typed, built-in data.
- The publication UI depends on one typed source contract. Preview supplies twelve agreed mock publications; the real adapter uses the existing CMS. Switching is controlled by environment configuration, not by request failure.
- Preview mode applies consistently to the entire deployment and emits no-index metadata. A global preview banner is not rendered; individual demonstration materials retain truthful labels where needed.
- Safe local preview mocks may represent missing photos, documents, video, contacts, legal text and integration states. They use future-facing data contracts, remain visibly demonstrational and never claim factual, legal or delivery validity.
- Outside preview mode, unavailable assets and integrations render truthful unavailable states. Preview mocks never appear automatically in production.
- Build all agreed primary routes: home; About overview, Mission, Documents and Reports; Services overview plus four service pages; Training; News archive and publication detail; NGO; Contacts. Also provide the legal destination and preserve the shared error page.
- Assemble each page from shared components and built-in typed content. Do not create page-specific copies of menu, pagination, form, document reader or CTA-context logic.
- The home page contains the hero, centre overview, three-person team, three latest publications and contact band. If the active publication source is empty, show an honest collection state.
- The About family shares the same team data and uses real hierarchical breadcrumbs. The Mission page contains exactly three principles and three steps.
- Documents provide three agreed rows, an on-page reader and a four-item table of contents. Reports expose the three agreed years, their panels and reader content without inventing financial figures.
- Services contains exactly four cards. Detail pages preserve their specified section order, FAQ counts and initial states; no price, guaranteed deadline, approval promise or unrequested service is added.
- Training contains exactly three program cards, formats and steps. It does not add dates, payment, a course selector or separate course pages.
- The publication archive contains six cards per page. Preview contains exactly twelve items and two pages. Production pagination comes exclusively from CMS metadata.
- Publication detail preserves slug loading and correct not-found/service-error handling. The primary preview article contains four H2 anchors: start, solutions, video and next; its table of contents uses those exact targets.
- NGO materials use three document rows and honest preview mocks; no additional archive or invented detail pages are added.
- Contacts uses one form instance. On smaller screens the content order becomes details, entrance, directions/map and form without duplicating fields.
- The legal destination contains the personal-data anchor. Preview legal copy is explicitly a draft; production without approved copy states that information is being prepared and keeps real submission disabled.
- Page metadata uses the public brand. Archive pages after the first include the page number in the title and use a canonical URL matching the selected valid page. Structured organization/article facts are emitted only from confirmed data.
- Do not add reading settings, search, donations, partners, filters, social widgets, comments, ratings, subscriptions or other features absent from the approved design.

## Testing Decisions

- This implementation ticket does not add an automated test framework or automated tests. A separate agent will add them immediately after the ticket is completed.
- The future primary automated seam is browser-level acceptance testing of the public Nuxt application. CMS publication responses and contact submission behavior should be controlled at the network boundary so tests exercise routes, URL state, history, focus, keyboard behavior, responsive composition and visible data states without coupling to component internals.
- The future suite should prefer this single high seam over many component-level tests. Small unit tests are justified only for pure normalization and allowlist logic if browser tests cannot isolate a failure clearly.
- There is no existing automated-test prior art in this repository. Existing quality gates are lint, TypeScript checking and production builds for both the public application and CMS.
- For this ticket, all existing quality gates must pass after the implementation. Dependency upgrades unrelated to the work are not part of validation.
- Q01 is a required manual browser acceptance pass. Check all fifteen primary routes at 1440 and 390 CSS pixels and shared components additionally at 768 and 320 CSS pixels.
- Manually check 200% zoom/reflow, absence of horizontal scrolling, visible focus, sticky-header offsets, one header/main/footer per page, six top-level navigation entries and seven child links.
- Manually check desktop dropdown behavior, mobile modal navigation, FAQ interactions, document selection, year selection, pagination, article contents, transcript disclosure and every contact-form state.
- Manually exercise direct URLs, refresh, back/forward and unknown values for document, year, archive page and publication slug.
- Manually verify that preview mode is labelled and non-indexable, production does not fall back to mocks, and no external request occurs through preview integration adapters.
- Compare page composition with the ten reference boards at their specified desktop and mobile sizes. Visual verification is judgment-based; do not introduce brittle pixel-perfect snapshot tests in this ticket.
- Record whether NVDA or VoiceOver was manually exercised. Automated analysis or keyboard checks must not be reported as screen-reader verification.

## Out of Scope

- Adding automated unit, component or end-to-end tests in this ticket.
- Expanding CMS ownership beyond publications or redesigning the CMS schema for general page content.
- Connecting a real form endpoint, sending real messages or writing demonstration content to a production CMS.
- Publishing or deploying the site.
- Providing factually valid photographs, PDFs, video, captions, audio descriptions, contact details, office location, legal policy or third-party integrations.
- Treating preview mocks as publication-ready content or enabling them as an error fallback.
- Redesigning the approved visual style or introducing reading settings, search or a dark theme.
- Adding new services, programs, pages, filters, commerce, calendar, comments, social features, donations or partner sections.
- Manual verification with NVDA or VoiceOver unless the implementing environment and a human tester make it available; its absence must be reported honestly.

## Further Notes

- The implementation journal's older statements naming C04 as the next step are historical. The verified journal and current code establish C09 as the next step.
- C01–C08 exist as reusable components, but most have not yet been exercised through completed public pages. Page assembly and Q01 are therefore necessary evidence, not a repetition of finished component work.
- The repository was clean before creation of the glossary, ADR and this specification.
- The source design package remains the authority for exact copy, layout order, mock identifiers and acceptance detail when this specification gives a summary.
- The glossary defines the public vocabulary, and the content-source ADR defines the CMS, preview and mock boundaries. Implementation must preserve both.
- The specification is ready for an implementation agent. Work should stop after publishing this file; no site implementation is included in the specification step.
