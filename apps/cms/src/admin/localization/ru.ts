export const russianTranslations = {
  // Article collection and fields.
  News: 'Статьи',
  title: 'Заголовок',
  slug: 'Адрес страницы',
  excerpt: 'Краткое описание',
  content: 'Содержимое',
  cover: 'Обложка',

  // Users & Permissions collection and fields.
  User: 'Пользователи',
  Users: 'Пользователи',
  username: 'Имя пользователя',
  email: 'Электронная почта',
  provider: 'Провайдер',
  password: 'Пароль',
  resetPasswordToken: 'Токен сброса пароля',
  confirmationToken: 'Токен подтверждения',
  confirmed: 'Подтверждён',
  blocked: 'Заблокирован',
  role: 'Роль',

  // Shared Content Manager table fields.
  documentId: 'ID документа',
  createdAt: 'Создано',
  updatedAt: 'Обновлено',
  publishedAt: 'Опубликовано',
  createdBy: 'Создал',
  updatedBy: 'Обновил',

  // Content Manager addresses field labels by their full content-type UID.
  'content-manager.content-types.api::news.news.title': 'Заголовок',
  'content-manager.content-types.api::news.news.slug': 'Адрес страницы',
  'content-manager.content-types.api::news.news.excerpt': 'Краткое описание',
  'content-manager.content-types.api::news.news.content': 'Содержимое',
  'content-manager.content-types.api::news.news.cover': 'Обложка',
  'content-manager.content-types.plugin::users-permissions.user.username':
    'Имя пользователя',
  'content-manager.content-types.plugin::users-permissions.user.email':
    'Электронная почта',
  'content-manager.content-types.plugin::users-permissions.user.provider': 'Провайдер',
  'content-manager.content-types.plugin::users-permissions.user.password': 'Пароль',
  'content-manager.content-types.plugin::users-permissions.user.resetPasswordToken':
    'Токен сброса пароля',
  'content-manager.content-types.plugin::users-permissions.user.confirmationToken':
    'Токен подтверждения',
  'content-manager.content-types.plugin::users-permissions.user.confirmed': 'Подтверждён',
  'content-manager.content-types.plugin::users-permissions.user.blocked': 'Заблокирован',
  'content-manager.content-types.plugin::users-permissions.user.role': 'Роль',

  // These Content Manager strings are absent from Strapi 5.55's bundled Russian locale.
  'content-manager.actions.clone.error': 'Не удалось создать копию документа.',
  'content-manager.actions.clone.label': 'Дублировать',
  'content-manager.actions.delete.dialog.body':
    'Вы точно хотите удалить этот документ? Это действие нельзя отменить.',
  'content-manager.actions.delete.error': 'Не удалось удалить документ.',
  'content-manager.actions.delete.label':
    'Удалить запись{isLocalized, select, true { (все языковые версии)} other {}}',
  'content-manager.actions.discard.dialog.body':
    'Вы точно хотите отменить изменения? Это действие нельзя отменить.',
  'content-manager.actions.discard.label': 'Отменить изменения',
  'content-manager.actions.edit.error': 'Не удалось изменить документ.',
  'content-manager.actions.edit.label': 'Изменить',
  'content-manager.actions.open-in-new-tab.label': 'Открыть в новой вкладке',
  'content-manager.actions.copy-documentId.label': 'Скопировать ID документа',
  'content-manager.actions.copy-documentId.success':
    'ID документа скопирован в буфер обмена',
  'content-manager.actions.unpublish.dialog.body':
    'Вы точно хотите снять эту запись с публикации?',
  'content-manager.actions.unpublish.dialog.option.keep-draft':
    'Снять с публикации и сохранить последний черновик',
  'content-manager.actions.unpublish.dialog.option.replace-draft':
    'Снять с публикации и заменить последний черновик',
  'content-manager.actions.unpublish.error':
    'Не удалось снять документ с публикации.',
  'content-manager.containers.edit.header.more-actions': 'Другие действия',
  'content-manager.containers.edit.information.document.label': 'Создано',
  'content-manager.containers.edit.information.document.value':
    '{time}{isAnonymous, select, true {} other {, автор: {author}}}',
  'content-manager.containers.edit.information.documentId.label': 'ID документа',
  'content-manager.containers.edit.information.last-draft.label': 'Обновлено',
  'content-manager.containers.edit.information.last-draft.value':
    '{time}{isAnonymous, select, true {} other {, автор: {author}}}',
  'content-manager.containers.edit.information.last-published.label': 'Опубликовано',
  'content-manager.containers.edit.information.last-published.value':
    '{time}{isAnonymous, select, true {} other {, автор: {author}}}',
  'content-manager.containers.edit.panels.default.more-actions':
    'Другие действия с документом',
  'content-manager.containers.edit.panels.default.title': 'Запись',
  'content-manager.containers.edit.tabs.draft': 'Черновик',
  'content-manager.containers.edit.tabs.label': 'Статус документа',
  'content-manager.containers.edit.tabs.published': 'Опубликовано',
  'content-manager.containers.edit.title.new': 'Создать запись',
  'content-manager.containers.empty-label': 'Без названия',
  'content-manager.containers.untitled': 'Без названия',
  'content-manager.containers.EditView.publishHint':
    'Ctrl / Cmd + Shift + Enter — опубликовать',
  'content-manager.containers.EditView.saveHint': 'Ctrl / Cmd + Enter — сохранить',
  'content-manager.containers.list.table-headers.status': 'Статус',
  'content-manager.form.Input.hint.character.unit':
    '{maxValue, plural, one { символ} few { символа} many { символов} other { символа}}',
  'content-manager.preview.panel.title': 'Предпросмотр',
  'content-manager.preview.panel.button': 'Открыть предпросмотр',
  'content-manager.preview.panel.button-configuration': 'Настроить предпросмотр',
  'content-manager.preview.panel.button-disabled-tooltip':
    'Сохраните запись, чтобы открыть предпросмотр',
  'content-manager.preview.page-title': 'Предпросмотр: {contentType}',
  'content-manager.preview.header.close': 'Закрыть предпросмотр',
  'content-manager.preview.copy.label': 'Скопировать ссылку на предпросмотр',
  'content-manager.preview.copy.success': 'Ссылка на предпросмотр скопирована',
  'content-manager.preview.tabs.label': 'Статус предпросмотра',
  'content-manager.preview.content.close-editor': 'Закрыть редактор',
  'content-manager.preview.content.open-editor': 'Открыть редактор',
  'content-manager.preview.device.select': 'Выберите тип устройства',
  'content-manager.preview.device.desktop': 'Компьютер',
  'content-manager.preview.device.mobile': 'Смартфон',
  'content-manager.preview.info.single-click-hint': 'Дважды нажмите, чтобы изменить',
  'content-manager.preview.error.invalid-field-path':
    'Не удалось найти это поле в текущем документе',
  'content-manager.preview.error.relations-not-handled':
    'Встроенное редактирование связей пока не поддерживается.',
  'content-manager.preview.error.incomplete-strapi-source':
    'Для предпросмотра этого поля не хватает обязательных данных',
  'content-manager.preview.error.different-document': 'Это поле относится к другому документу',
  'content-manager.preview.error.script-failed':
    'Не удалось загрузить скрипт предпросмотра. Визуальное редактирование может быть недоступно.',
  'content-manager.validation.error':
    'В документе есть ошибки. Исправьте их перед сохранением.',
  'content-manager.validation.error.unreadable-required-field':
    'Текущие права не позволяют открыть некоторые обязательные поля. Обратитесь к администратору.',
} as const;
