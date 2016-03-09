import { RECEIVE_PAGES } from '../actions/pages';

export default function pages(state = {}, action = {}) {
  switch (action.type) {
  case RECEIVE_PAGES:
    return {
      ...state,
      [action.chapterId]: action.pages,
    };
  default:
    return state;
  }
}
