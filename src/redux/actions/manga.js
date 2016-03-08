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

export function fetchChapters(id) {
  return (dispatch, getState) => {
    dispatch(requestChapters(id));

    const { siteId, link } = getState().library[id];

    return parsers[siteId].fetchChapters(link)
      .then(chapters => {
        dispatch(receiveChapters(id, chapters));
        return chapters;
      });
  };
}

function shouldFetchChapters(state, id) {
  const { chapters } = state;

  if (chapters[id]) {
    return false;
  } else {
    return true;
  }
}

export function fetchChaptersIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchChapters(getState(), id)) {
      return dispatch(fetchChapters(id));
    } else {
      return Promise.resolve();
    }
  };
}
