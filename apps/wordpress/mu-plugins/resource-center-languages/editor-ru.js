(() => {
    function localizeEditors() {
        for (const editor of window.wp?.pluginMarkupMarkdown?.instances ?? []) {
            editor.options.promptTexts.link = 'Введите URL ссылки';
            editor.options.promptTexts.image = 'Введите URL изображения';
            editor.options.insertTexts.table = [
                '',
                '\n\n| Столбец 1 | Столбец 2 | Столбец 3 |\n| --------- | --------- | --------- |\n| Текст     | Текст     | Текст     |\n\n',
            ];
        }
    }

    // EasyMDE can emit this while constructing an instance, before registering it.
    document.addEventListener('CodeMirrorSpellCheckerReady', () => queueMicrotask(localizeEditors));
    localizeEditors();
})();
