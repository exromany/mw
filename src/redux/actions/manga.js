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

export function fetchChapters(siteId, link, id) {
  return dispatch => {
    dispatch(requestChapters(id));

    return parsers[siteId].fetchChapters(link)
      .then(chapters => {
        dispatch(receiveChapters(id, chapters));
      });
  };
}
