import {
  LOAD_CONTENT_REPOSITORY_SUCESS,
  CONTENT_REPOSITORY_CHANGE_PAGE,
  LOAD_SIMULAR_ARTICLES_CONTENT_REPOSITORY_SUCESS,
} from '@actions';

const initialState = {
  count: 0,
  page: 1,
  docs: null,
  simularArticles: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_SIMULAR_ARTICLES_CONTENT_REPOSITORY_SUCESS:
      return {
        ...state,
        simularArticles: payload,
      };
    case LOAD_CONTENT_REPOSITORY_SUCESS:
      return {
        ...state,
        count: payload.count,
        docs: payload.docs,
      };
    case CONTENT_REPOSITORY_CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };
    default:
      return state;
  }
};
