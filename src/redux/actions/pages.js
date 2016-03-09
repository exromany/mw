import { parsers } from '../parsers';

export const REQUEST_PAGES = 'REQUEST_PAGES';
export const RECEIVE_PAGES = 'RECEIVE_PAGES';

function requestPages(mangaId, chapterId) {
  return {
    type: REQUEST_PAGES,
    mangaId,
    chapterId,
  };
}

function receivePages(mangaId, chapterId, pages) {
  return {
    type: RECEIVE_PAGES,
    mangaId,
    chapterId,
    pages,
  };
}

export function fetchPages(mangaId, chapterId) {
  return (dispatch, getState) => {
    dispatch(requestPages(mangaId, chapterId));

    const { library, chapters } = getState();
    const { siteId } = library[mangaId];
    const { link } = chapters[mangaId].find(chapter => chapter.id === chapterId);

    return parsers[siteId].fetchPages(link)
      .then(pages => {
        dispatch(receivePages(mangaId, chapterId, pages));
        return pages;
      });
  };
}

function shouldFetchPages(state, mangaId, chapterId) {
  const { pages } = state;

  if (pages[chapterId] && pages[chapterId].length) {
    return false;
  } else {
    return true;
  }
}

export function fetchPagesIfNeeded(mangaId, chapterId) {
  return (dispatch, getState) => {
    if (shouldFetchPages(getState(), mangaId, chapterId)) {
      return dispatch(fetchPages(mangaId, chapterId));
    } else {
      return Promise.resolve();
    }
  };
}
