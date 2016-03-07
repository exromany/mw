import { fetchResponse, parseHtml } from '../../utils/html';

const ROOT_URL = 'http://readmanga.me';

function extractInfo($) {
  const covers = $('.subject-cower img').toArray().map(item => $(item).attr('src'));
  return {
    title: $('meta[itemprop="alternativeHeadline"]').attr('content').trim(),
    altTitle: $('meta[itemprop="name"]').attr('content').trim(),
    summary: $('meta[itemprop="description"]').attr('content').trim(),
    authors: $('.elem_author .person-link').toArray().map(item => $(item).text()),
    cover: covers[0],
    genres: $('.elem_genre .element-link').toArray().map(item => $(item).text()),
    year: $('.elem_year').text().trim(),
    category: $('.elem_tag').text().trim(),
    mature: $('.mature-message-small').length > 0,
    chapters: $('.chapters-link tr:not(thead tr)').length,
    covers,
  };
}

export default function fetchInfo(link) {
  return fetchResponse(`${ROOT_URL}${link}`)
    .then(parseHtml)
    .then(extractInfo)
    .then(info => ({ ...info, link }));
}
