import { fetchResponse, parseHtml } from '../../utils/html';

const ROOT_URL = 'http://mintmanga.com';

function extractChapters($) {
  return $('.chapters-link tr:not(thead tr)').toArray().map(item => ({
    title: $('a', item).text().replace(/[\s\t\n]+/g, ' ').trim(),
    link: $('a', item).attr('href'),
    date: $('td[align=right]', item).text().replace(/[\s\t\n]+/g, ' ').trim(),
  }));
}

export default function fetchChapters(link) {
  return fetchResponse(`${ROOT_URL}${link}`)
    .then(parseHtml)
    .then(extractChapters);
}
