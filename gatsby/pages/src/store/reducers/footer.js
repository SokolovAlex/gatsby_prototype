
import { TOGGLE_COUNTRY_SELECTOR } from '@actions';

const initialState = {
    isCountrySelectorOpen: false,
};

export default (state = initialState, { type }) => {
    switch (type) {
        case TOGGLE_COUNTRY_SELECTOR:
            return { ...state,
                isCountrySelectorOpen: !state.isCountrySelectorOpen
            };
        default:
            return state;
    }
};