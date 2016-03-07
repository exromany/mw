import {
  INVALIDATE_CATALOG,
  REQUEST_CATALOG,
  RECEIVE_CATALOG,
  REQUEST_INFO,
  RECEIVE_INFO,
} from '../actions/catalog';

const initState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  siteId: null,
  info: null,
};

export default function catalog(state = initState, action = {}) {
  switch (action.type) {
  case INVALIDATE_CATALOG:
    return {
      ...state,
      didInvalidate: true,
    };
  case REQUEST_CATALOG:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false,
    };
  case RECEIVE_CATALOG:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.items,
      siteId: action.siteId,
      info: null,
    };
  case REQUEST_INFO:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false,
      info: null,
    };
  case RECEIVE_INFO:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      info: action.info,
      siteId: action.siteId,
    };
  default:
    return state;
  }
}
