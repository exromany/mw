import { RECEIVE_PAGES } from '../actions/pages';

// const initState = {
//   'readmanga/naruto': {
//     '/naruto/1/1': [ {
//       uri: 'http://e4.postfact.ru/auto/16/29/83/01.png',
//       width: 900,
//       height: 1300,
//     }, {
//       uri: 'http://e4.postfact.ru/auto/16/29/83/18.jpg',
//       width: 1000,
//       height: 498,
//     }, {
//       uri: 'http://e4.postfact.ru/auto/16/29/83/19.png_res.jpg',
//       width: 800,
//       height: 1200,
//     } ],
//   },
// };

export default function pages(state = {}, action = {}) {
  switch (action.type) {
  case RECEIVE_PAGES:
    return {
      ...state,
      [action.mangaId]: {
        ...state[action.mangaId],
        [action.chapterLink]: action.pages,
      },
    };
  default:
    return state;
  }
}
