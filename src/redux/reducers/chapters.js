import {
  REQUEST_CHAPTERS,
  RECEIVE_CHAPTERS,
} from '../actions/manga';

const initChapters = {
  chapters: [],
  isFetching: false,
};

const initChapter = {
  title: null,
  link: null,
  data: null,
  isNew: false,
  isRead: false,
  idDownloaded: false,
};

function chapter(state = initChapter, action = {}) {
  switch (action.type) {
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      ...action.item,
    };
  default:
    return state;
  }
}

function chapters(state = initChapters, action = {}) {
  switch (action.type) {
  case REQUEST_CHAPTERS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      chapters: action.chapters.map(item => chapter(
        state.chapters.find(chapter => chapter.link === item.link),
        { type: action.type, item }
      )),
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
