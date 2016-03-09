import {
  ADD_MANGA,
  UPDATE_MANGA,
  REMOVE_MANGA,
} from '../actions/library';

import {
  REQUEST_CHAPTERS,
  RECEIVE_CHAPTERS,
} from '../actions/chapters';

const initMangaState = {
  title: null,
  alt_title: null,
  summary: null,
  authors: [],
  cover: null,
  genres: [],
  year: null,
  category: null,
  mature: false,
  chapters: 0,
  covers: [],
};

function mangaId({ manga: { siteId, link } }) {
  return `${siteId}@${link}`;
}

export function manga(state = initMangaState, action = {}) {
  switch (action.type) {
  case ADD_MANGA:
    return {
      ...action.manga,
      id: mangaId(action),
    };
  case UPDATE_MANGA:
    return {
      ...state,
      ...action.manga,
      id: state.id,
    };
  case REQUEST_CHAPTERS:
    return {
      ...state,
      isFetchingChapters: true,
    };
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      isFetchingChapters: false,
    };
  default:
    return state;
  }
}

export default function library(state = {}, action = {}) {
  switch (action.type) {
  case ADD_MANGA: {
    const item = manga(undefined, action);
    return {
      ...state,
      [item.id]: item,
    };
  }
  case REMOVE_MANGA:
    return {
      ...state,
      [action.mangaId]: undefined,
    };
  case UPDATE_MANGA:
  case REQUEST_CHAPTERS:
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      [action.mangaId]: manga(state[action.mangaId], action),
    };
  default:
    return state;
  }
}
