import { combineReducers } from 'redux';

import cities from './cities';

export default combineReducers({
  cities
})


/*
import fetch from 'isomorphic-fetch'

fetch('URL')
  .then((response) => response.json())
  .then()
*/
