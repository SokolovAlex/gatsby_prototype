
import { LOAD_RESOURCE_SUCCESS } from '@actions';

const initialState = {
    count: 0,
    docs: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_RESOURCE_SUCCESS:
            return { ...state,
                docs: payload.docs,
                count: payload.count,
            };
        default:
            return state;
    }
};