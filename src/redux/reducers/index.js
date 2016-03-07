import { combineReducers } from 'redux';

import sites from './sites';
import catalog from './catalog';
import library from './library';
import chapters from './chapters';
// import pages from './pages';
// import routes from './routes';

const rootReducer = combineReducers({
  sites,
  catalog,
  library,
  chapters,
  // pages,
  // routes,
});

export default rootReducer;
