import {
  RECEIVE_CHAPTERS,
} from '../actions/chapters';

const initChapter = {
  title: null,
  link: null,
  data: null,
  isNew: false,
  isRead: false,
  idDownloaded: false,
};


function chapterId({ mangaId, item: { link }}) {
  return `${mangaId}@${link}`;
}

function chapter(state = initChapter, action = {}) {
  switch (action.type) {
  case RECEIVE_CHAPTERS:
    return {
      ...state,
      ...action.item,
      id: chapterId(action),
    };
  default:
    return state;
  }
}

export default function chapters(state = {}, action = {}) {
  switch (action.type) {
  case RECEIVE_CHAPTERS: {
    const { type, mangaId } = action;
    return {
      ...state,
      [mangaId]: action.chapters.map(item => chapter(
        // state[mangaId].find(chapter => chapter.link === item.link),
        undefined,
        { type, mangaId, item }
      )),
    };
  }
  default:
    return state;
  }
}
