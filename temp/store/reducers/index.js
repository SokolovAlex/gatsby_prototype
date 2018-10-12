import { combineReducers } from 'redux';
import contentRepository from './content-repository';
import footer from './footer';

export default combineReducers({
  contentRepository,
  footer,
});
