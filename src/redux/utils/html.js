import cheerio from 'cheerio';

export function getResponse(response) {
  if (response.status !== 200) {
    throw new Error('not found');
  }
  return response.text();
}

export function fetchResponse(url, params) {
  return fetch(url, params).then(getResponse);
}

export function parseHtml(text) {
  return new Promise((resolve) => {
    resolve(cheerio.load(text));
  });
}

export function grepHtml(text, dataRE, pagesRE, pageRE, formatItem) {
  const pagesText = text.match(dataRE)[1];
  if (!pagesText) return null;
  return pagesText.match(pagesRE).map(page => {
    const matches = page.match(pageRE);
    return formatItem(matches);
  });
}
