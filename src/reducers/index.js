import { combineReducers } from 'redux';
import page from './page';
import user from './user';

export default combineReducers({
  page,
  user
})


/*
import fetch from 'isomorphic-fetch'

fetch('URL')
  .then((response) => response.json())
  .then()
*/
