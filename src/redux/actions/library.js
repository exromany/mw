import { ToastAndroid } from 'react-native';

export const ADD_MANGA = 'ADD_MANGA';
export const UPDATE_MANGA = 'UPDATE_MANGA';
export const REMOVE_MANGA = 'REMOVE_MANGA';

function _addManga(data) {
  return {
    type: ADD_MANGA,
    manga: data,
  };
}

export function updateManga(data) {
  return {
    type: UPDATE_MANGA,
    manga: data,
  };
}

export function removeManga(data) {
  return {
    type: REMOVE_MANGA,
    manga: data,
  };
}

export function addManga(data) {
  return dispatch => {
    dispatch(_addManga(data));
    ToastAndroid.show('Manga added', ToastAndroid.SHORT);
  };
}
