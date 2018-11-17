import { CHANGE_LAYOUT } from '../actions';

const LayoutTypes = {
  simple: 0,
  blue: 1,
};

const initialState = {
  layoutType: LayoutTypes.blue,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: payload,
      };
    default:
      return state;
  }
}