window.onload = () => {
    const es = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;

    const unes = {
        '&amp;': '&',
        '&#38;': '&',
        '&lt;': '<',
        '&#60;': '<',
        '&gt;': '>',
        '&#62;': '>',
        '&apos;': "'",
        '&#39;': "'",
        '&quot;': '"',
        '&#34;': '"',
    };
    const cape = (m) => unes[m];

    const unescape = (un) => un.replace.call(un, es, cape);

    // markdownToHtml
    const converter = new showdown.Converter({
        tables: true,
        tasklists: true,
        strikethrough: true, // 删除线
        emoji: false,
    });
    const posts = document.querySelectorAll('.markdown-body');
    posts.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.innerHTML = converter.makeHtml(unescape(el.innerHTML.trim()));
    });

    // 代码高亮
    hljs.highlightAll();
    const head = document.querySelector('head');
    function appendStyle(href) {
        const linkEl = document.createElement('link');
        linkEl.href = href;
        linkEl.rel = 'stylesheet';
        linkEl.type = 'text/css';
        head.appendChild(linkEl);
    }
    appendStyle('https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css');
    appendStyle('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/default.min.css');
};
