# Markdown dependencies

- Parsedown 1.8.0 from https://github.com/erusev/parsedown/tree/1.8.0
- Parsedown Extra 0.9.0 from https://github.com/erusev/parsedown-extra/tree/0.9.0
- Emoji data and text shortcuts from the repository's pinned markdown-it-emoji 2.0.2.

The PHP sources use a plugin-specific namespace so they can coexist with the copy
loaded by Markup Markdown. Emoji shortcuts were flattened into a JSON map from
literal text to emoji and sorted longest first. Upstream licenses are included.
