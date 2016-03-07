import {
  REQUEST_CHAPTERS,
  RECEIVE_CHAPTERS,
} from '../actions/manga';

const initChapter = {
  chapters: [],
  isFetching: false,
  isRead: false,
  isDownloaded: false,
};

function chapters(state = initChapter, action = {}) {
  switch (action.type) {
  case REQUEST_CHAPTERS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      chapters: action.chapters,
      isFetching: false,
    };
  default:
    return state;
  }
}

export default function mangaChapters(state = {}, action = {}) {
  switch (action.type) {
  case REQUEST_CHAPTERS:
    return {
      ...state,
      [action.mangaId]: chapters(state[action.mangaId], action),
    };
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      [action.mangaId]: chapters(state[action.mangaId], action),
    };
  default:
    return state;
  }
}
