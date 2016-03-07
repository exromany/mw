import fetchCatalog from './catalog';
import fetchInfo from './info';
import fetchChapters from './chapters';

const manga = {
  id: 'readmanga',
  name: 'ReadManga',
  url: 'http://readmanga.me',
  icon: 'http://res.readmanga.me/static/logo_m-0d28ac65905711fa45aa4caf3e3d6dd5.png',
  lang: 'RU',
};

export const parsers = {
  fetchCatalog,
  fetchInfo,
  fetchChapters,
};

export default manga;
