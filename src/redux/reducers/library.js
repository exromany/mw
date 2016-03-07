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

const initState = [
  {
    title:'Noblesse',
    alt_title:'Дворянство',
    summary:'Действия разворачиваются в «наше время». Кроме людей в мире существуют еще две расы: ноблесс или благородные и оборотни. История начинается с пробуждения после 820-летнего сна ноблесс — Кадиса Этрама Д. Рейзела (сокращенно Рей) на территории современной Южной Кореи. Выйдя из сна и ничего не зная о мире, он попадает в старшую школу «Е-Ран», где встречается с директором этой школы, являющимся его старым знакомым — Франкенштейном. Впоследствии он начинает дружить с несколькими учениками из этой школы. Всем вместе им приходится столкнуться с могущественной и агрессивной организацией «Союз», которая «закулисно» правит всем миром. # Ogami-kun',
    authors:[
      'Сон Чже-Хо',
      'Ли Кван-Су',
    ],
    cover:'http://d.readmanga.ru/uploads/pics/00/05/084.jpg',
    genres:[
      'комедия',
      'сверхъестественное',
      'мистика',
      'сэйнэн',
      'фэнтези',
      'боевик',
      'драма',
      'школа',
    ],
    year:' 2008',
    category:' Веб, Манхва',
    mature:false,
    chapters:402,
    covers:[
      'http://d.readmanga.ru/uploads/pics/00/05/084.jpg',
      'http://d.readmanga.ru/uploads/pics/00/35/583.jpg',
      'http://d.readmanga.ru/uploads/pics/00/35/584.jpg',
      'http://d.readmanga.ru/uploads/pics/00/35/585.jpg',
      'http://d.readmanga.ru/uploads/pics/00/35/586.jpg',
      'http://d.readmanga.ru/uploads/pics/00/35/587.jpg',
      'http://d.readmanga.ru/uploads/pics/00/35/588.jpg',
      'http://d.readmanga.ru/uploads/pics/00/39/578.jpg',
    ],
    link:'/noblesse',
    siteId:'readmanga',
    id:'readmanga/noblesse',
  },
];

function mangaId(manga) {
  return `${manga.siteId}${manga.link}`;
}

export function manga(state, action = {}) {
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

export default function library(state = initState, action = {}) {
  switch (action.type) {
  case ADD_MANGA:
    return [
      ...state,
      manga(initMangaState, action),
    ];
  case UPDATE_MANGA:
    return state.map((item) => {
      return item.id === action.id ? manga(item, action) : item;
    });
  case REMOVE_MANGA:
    return state.splace(state.find(item => item.id === action.id));
  default:
    return state;
  }
}
