import { parsers } from '../parsers';

export const REQUEST_PAGES = 'REQUEST_PAGES';
export const RECEIVE_PAGES = 'RECEIVE_PAGES';

function requestPages(mangaId, chapterLink) {
  return {
    type: REQUEST_PAGES,
    mangaId,
    chapterLink,
  };
}

function receivePages(mangaId, chapterLink, pages) {
  return {
    type: RECEIVE_PAGES,
    mangaId,
    chapterLink,
    pages,
  };
}

export function fetchPages(mangaId, chapterLink) {
  return (dispatch, getState) => {
    dispatch(requestPages(mangaId, chapterLink));

    const { siteId } = getState().library[mangaId];

    return parsers[siteId].fetchPages(chapterLink)
      .then(pages => {
        dispatch(receivePages(mangaId, chapterLink, pages));
        return pages;
      });
  };
}

function shouldFetchPages(state, mangaId, chapterLink) {
  const { pages } = state;

  if (pages[mangaId] && pages[mangaId][chapterLink] && pages[mangaId][chapterLink].length) {
    return false;
  } else {
    return true;
  }
}

export function fetchPagesIfNeeded(mangaId, chapterLink) {
  return (dispatch, getState) => {
    if (shouldFetchPages(getState(), mangaId, chapterLink)) {
      return dispatch(fetchPages(mangaId, chapterLink));
    } else {
      return Promise.resolve();
    }
  };
}
