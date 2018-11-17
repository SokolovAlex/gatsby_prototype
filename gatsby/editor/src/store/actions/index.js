export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';

export const ChangeLayout = (ltype) => ({
    type: CHANGE_LAYOUT,
    payload: ltype,
});