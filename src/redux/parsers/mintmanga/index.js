import fetchCatalog from './catalog';
import fetchInfo from './info';
import fetchChapters from './chapters';

const manga = {
  id: 'mintmanga',
  name: 'MintManga',
  url: 'http://mintmanga.com/',
  icon: 'http://res.mintmanga.com/static/logo_m-eb86a0f097abc2401f06eb564410ce5b.png',
  lang: 'RU',
};

export const parsers = {
  fetchCatalog,
  fetchInfo,
  fetchChapters,
};

export default manga;
