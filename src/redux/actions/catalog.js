import { parsers } from '../parsers';

export const INVALIDATE_CATALOG = 'INVALIDATE_CATALOG';
export const REQUEST_CATALOG = 'REQUEST_CATALOG';
export const RECEIVE_CATALOG = 'RECEIVE_CATALOG';
export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';

export function invalidateCatalog() {
  return {
    type: INVALIDATE_CATALOG,
  };
}

function requestCatalog() {
  return {
    type: REQUEST_CATALOG,
  };
}

function receiveCatalog(siteId, items) {
  return {
    type: RECEIVE_CATALOG,
    items,
    siteId,
  };
}

function requestInfo() {
  return {
    type: REQUEST_INFO,
  };
}

function receiveInfo(siteId, info) {
  return {
    type: RECEIVE_INFO,
    info,
    siteId,
  };
}

export function fetchCatalog(siteId) {
  return dispatch => {
    dispatch(requestCatalog());

    return parsers[siteId].fetchCatalog()
      .then(items => {
        dispatch(receiveCatalog(siteId, items));
      });
  };
}

function shouldFetchCatalog(state, oldSiteId) {
  const { catalog: { items, isFetching, didInvalidate, siteId } } = state;

  if (!items.length || !siteId || oldSiteId !== siteId) {
    return true;
  } else if (isFetching) {
    return false;
  } else {
    return didInvalidate;
  }
}

export function fetchCatalogIfNeeded(siteId) {
  return (dispatch, getState) => {
    if (shouldFetchCatalog(getState(), siteId)) {
      return dispatch(fetchCatalog(siteId));
    } else {
      return Promise.resolve();
    }
  };
}

export function fetchInfo(siteId, link) {
  return dispatch => {
    dispatch(requestInfo());

    return parsers[siteId].fetchInfo(link)
      .then(info => ({ ...info, siteId }))
      .then(info => {
        dispatch(receiveInfo(siteId, info));
        return info;
      });
  };
}
