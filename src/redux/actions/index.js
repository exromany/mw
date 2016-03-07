import * as catalogActions from './catalog';
import * as libraryActions from './library';
import * as mangaActions from './manga';

const actions = {
  ...catalogActions,
  ...libraryActions,
  ...mangaActions,
};

export default actions;
