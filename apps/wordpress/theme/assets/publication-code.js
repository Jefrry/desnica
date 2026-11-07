import highlight from 'highlight.js';

for (const code of document.querySelectorAll('.publication-body pre > code[class]')) {
  const language = [...code.classList].find(name => name.startsWith('language-'))?.slice(9).toLowerCase();
  if (language === 'auto') {
    code.innerHTML = highlight.highlightAuto(code.textContent).value;
  } else if (language && highlight.getLanguage(language)) {
    code.innerHTML = highlight.highlight(code.textContent, { language, ignoreIllegals: true }).value;
  }
}
