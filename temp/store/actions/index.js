export const TOGGLE_COUNTRY_SELECTOR = 'TOGGLE_COUNTRY_SELECTOR';
export const LOAD_CONTENT_REPOSITORY_SUCESS = 'LOAD_CONTENT_REPOSITORY_SUCESS';
export const LOAD_SIMULAR_ARTICLES_CONTENT_REPOSITORY_SUCESS = 'LOAD_SIMULAR_ARTICLES_CONTENT_REPOSITORY_SUCESS';
export const CONTENT_REPOSITORY_CHANGE_PAGE = 'CONTENT_REPOSITORY_CHANGE_PAGE';

export const isCountrySelectorOpen = () => ({
  type: TOGGLE_COUNTRY_SELECTOR,
});

export const loadContentRepositorySuccess = (data) => ({
  type: LOAD_CONTENT_REPOSITORY_SUCESS,
  payload: data,
});

export const loadSimularArticlesContentRepositorySuccess = (articles) => ({
  type: LOAD_SIMULAR_ARTICLES_CONTENT_REPOSITORY_SUCESS,
  payload: articles,
});

export const contentRepositoryChangePage = (page) => ({
  type: CONTENT_REPOSITORY_CHANGE_PAGE,
  payload: page,
});
