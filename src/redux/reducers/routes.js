import { BackAndroid, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';

const POP_ROUTE = 'POP_ROUTE';
const RESET_BACK_BUTTON = 'RESET_BACK_BUTTON';
const BACK_BUTTON_PRESSED = 'BACK_BUTTON_PRESSED';

const initState = {
  current: {
    name: null,
    params: null,
  },
  stack: [],
  backPressedOnce: false,
};

export default function routes(state = initState, action = {}) {
  switch (action.type) {
  case POP_ROUTE:
    return {
      ...state,
      stack: action.stack,
      current: {
        name: action.name,
        params: action.params,
      },
    };
  case RESET_BACK_BUTTON:
    return {
      ...state,
      backPressedOnce: false,
    };
  case BACK_BUTTON_PRESSED:
    return {
      ...state,
      backPressedOnce: true,
    };
  default:
    return state;
  }
}

export function popRoute(route, params) {
  return dispatch => {
    dispatch({
      type: POP_ROUTE,
      name: route.name,
      stack: route.parent._stack,
      params,
    });
    dispatch({
      type: RESET_BACK_BUTTON,
    });
  };
}

export function backButton() {
  return (dispatch, getState) => {
    try {
      Actions.pop();
      return null;
    } catch (err) {
      const { routes: {backPressedOnce}} = getState();
      if (backPressedOnce) {
        BackAndroid.exitApp();
        return null;
      }
      ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
      dispatch({
        type: BACK_BUTTON_PRESSED,
      });
    }
  };
}
