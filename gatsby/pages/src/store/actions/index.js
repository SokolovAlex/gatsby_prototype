export const TOGGLE_COUNTRY_SELECTOR = 'TOGGLE_COUNTRY_SELECTOR';
export const LOAD_RESOURCE_SUCCESS = 'LOAD_RESOURCE_SUCCESS';

export const isCountrySelectorOpen = () => ({
    type: TOGGLE_COUNTRY_SELECTOR
});

export const loadResourceSuccess = (data) => ({
    type: LOAD_RESOURCE_SUCCESS,
    payload: data,
});
