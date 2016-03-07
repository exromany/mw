import {
  ADD_MANGA,
  UPDATE_MANGA,
  REMOVE_MANGA,
} from '../actions/library';

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

function mangaId(manga) {
  return `${manga.siteId}${manga.link}`;
}

export function manga(state = initMangaState, action = {}) {
  switch (action.type) {
  case ADD_MANGA:
    return {
      ...action.manga,
      id: mangaId(action.manga),
    };
  case UPDATE_MANGA:
    return {
      ...state,
      ...action.manga,
      id: state.id,
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
  case UPDATE_MANGA:
    return {
      ...state,
      [action.id]: manga(state[action.id], action),
    };
  case REMOVE_MANGA:
    return {
      ...state,
      [action.id]: undefined,
    };
  default:
    return state;
  }
}
