import { Source } from '@lnreader/plugin-core';

export default class TruthNovel extends Source {
  name = 'TruthNovel';
  baseUrl = 'https://truthnovel.top';
  lang = 'ar';

  async getChapterDetails(chapterUrl: string) {
    const res = await fetch(chapterUrl);
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, 'text/html');

    const title = doc.querySelector('h1')?.textContent || '';

    let content = '';
    doc.querySelectorAll('.entry-content p').forEach(p => {
      content += `<p>${p.textContent}</p>`;
    });

    return {
      title,
      content,
    };
  }
}
