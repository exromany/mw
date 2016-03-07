import { fetchResponse, parseHtml } from '../../utils/html';

const ROOT_URL = 'http://mintmanga.com';
let tries = 3;

export function extractCatalog($) {
  return {
    pagination: {
      nextLink: $('.pagination .nextLink').first().attr('href'),
    },
    items: $('.tiles .tile').toArray().map(manga => ({
      link: $('h3 a', manga).attr('href'),
      title: $('h3', manga).text().trim(),
      altTitle: $('h4', manga).text().trim(),
      cover: $('.img img', manga).attr('src'),
      authors: $('.tile-info .person-link', manga).toArray().map(item => $(item).text()),
      genres: $('.tile-info .element-link', manga).toArray().map(item => $(item).text()),
    })),
  };
}

function fetchCatalogPage(link = '/list') {
  return fetchResponse(`${ROOT_URL}${link}`)
    .then(parseHtml)
    .then(extractCatalog)
    .then(data => {
      tries -= 1;
      if (data.pagination.nextLink && tries > 0) {
        return fetchCatalogPage(data.pagination.nextLink)
          .then(items => data.items.concat(items));
      } else {
        return data.items;
      }
    });
}


export function search(query) {
  fetchResponse(`${ROOT_URL}/search`, {
    method: 'POST',
    body: JSON.stringify({ q: query }),
  })
    .then(parseHtml)
    .then(extractCatalog)
    .then(data => data.items);
}

export default function fetchCatalog() {
  return fetchCatalogPage();
}
