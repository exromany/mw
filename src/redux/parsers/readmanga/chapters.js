import { fetchResponse, parseHtml } from '../../utils/html';

const ROOT_URL = 'http://readmanga.me';

function extractChapters($) {
  const altTitle = $('meta[itemprop="name"]').attr('content').trim();

  return $('.chapters-link tr:not(thead tr)').toArray().map(item => {
    const isNew = $('a', item).find('.chapterNew').replaceWith().length > 0;
    return {
      title: $('a', item).text().replace(/[\s\t\n]+/g, ' ').replace(altTitle, '').trim(),
      link: $('a', item).attr('href'),
      data: $('td[align=right]', item).text().replace(/[\s\t\n]+/g, ' ').trim(),
      isNew,
    };
  });
}

export default function fetchChapters(link) {
  return fetchResponse(`${ROOT_URL}${link}`)
    .then(parseHtml)
    .then(extractChapters);
}
