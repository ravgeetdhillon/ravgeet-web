const turndown = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');
const fs = require('fs');
const slugify = require('slugify');

const turndownService = turndown({ codeBlockStyle: 'fenced', emDelimiter: '*', preformattedCode: true });
turndownService.use(turndownPluginGfm.gfm);

function getSlug(string) {
    const slug = slugify(string, { lower: true, remove: /[*+~.()'"!:@,/?]/g });
    return slug;
}

function createFromCli(fileName) {
    const rawHtml = fs.readFileSync(`collections/_blogs_external/${fileName}`).toString();
    const markdown = turndownService.turndown(rawHtml);
    console.log(markdown);
}

function fetchFromFeed() {
    const feed = JSON.parse(fs.readFileSync(`_scripts/node/feed.json`).toString());

    feed.items.forEach((blog) => {
        const markdown = turndownService.turndown(blog.content_html);

        const blogFileContents = `---
title: ${blog.title}

description: ${blog.summary}

date: ${
            blog.date_published.split('T')[0] +
            ' ' +
            blog.date_published.split('T')[1].split('+')[0] +
            ' +' +
            blog.date_published.split('+')[1]
        }

tags: [${blog.tags}]

canonical_details:
  site: RavSam
  url: ${blog.url}
---

${markdown}
    `;

        const fileName = `collections/_blogs_external/${getSlug(blog.title)}.md`;
        fs.writeFileSync(fileName, blogFileContents);
    });
}

const fileName = process.argv[2];

if (fileName !== undefined) {
    createFromCli(filename);
}

// fetchFromFeed();
