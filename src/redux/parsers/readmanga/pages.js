import { fetchResponse, grepHtml } from '../../utils/html';

const ROOT_URL = 'http://readmanga.me';

function extractPages(text) {
  const pageRE = /\[['"]([^'"]*)['"],['"]([^'"]*)['"],['"]([^'"]*)['"],(\d*),(\d*)\]/;
  const pagesRE = /\[[^\]]*\]/gm;
  const dataRE = /rm_h\.init\((.*)\);/;

  return grepHtml(text, dataRE, pagesRE, pageRE, matches => ({
    uri: `${matches[2]}${matches[1]}${matches[3]}`,
    width: parseInt(matches[4], 10),
    height: parseInt(matches[5], 10),
  }));
}

export function loadPages(link) {
  fetchResponse(`${ROOT_URL}${link}`)
    .then(extractPages);
}
