import * as catalogActions from './catalog';
import * as libraryActions from './library';
import * as mangaActions from './manga';

const actions = {
  ...catalogActions,
  ...libraryActions,
  ...mangaActions,
};

export default actions;

export const blackListActions = [
  catalogActions.INVALIDATE_CATALOG,
  catalogActions.REQUEST_CATALOG,
  catalogActions.RECEIVE_CATALOG,
  catalogActions.REQUEST_INFO,
  catalogActions.RECEIVE_INFO,
  mangaActions.REQUEST_CHAPTERS,
];

export const whiteListActions = undefined;
