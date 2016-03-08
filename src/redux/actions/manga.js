import { parsers } from '../parsers';

export const REQUEST_CHAPTERS = 'REQUEST_CHAPTERS';
export const RECEIVE_CHAPTERS = 'RECEIVE_CHAPTERS';

function requestChapters(mangaId) {
  return {
    type: REQUEST_CHAPTERS,
    mangaId,
  };
}

function receiveChapters(mangaId, chapters) {
  return {
    type: RECEIVE_CHAPTERS,
    mangaId,
    chapters,
  };
}

export function fetchChapters(magnaId) {
  return (dispatch, getState) => {
    dispatch(requestChapters(magnaId));

    const { siteId, link } = getState().library[magnaId];

    return parsers[siteId].fetchChapters(link)
      .then(chapters => {
        dispatch(receiveChapters(magnaId, chapters));
        return chapters;
      });
  };
}

function shouldFetchChapters(state, magnaId) {
  const { chapters } = state;

  if (chapters[magnaId]) {
    return false;
  } else {
    return true;
  }
}

export function fetchChaptersIfNeeded(magnaId) {
  return (dispatch, getState) => {
    if (shouldFetchChapters(getState(), magnaId)) {
      return dispatch(fetchChapters(magnaId));
    } else {
      return Promise.resolve();
    }
  };
}
