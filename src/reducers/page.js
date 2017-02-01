import {
  SET_CITY,
  GET_TEMP_SUCCESS } from '../constants/Page';

const initialState = {
  city: 'MOSKOW',
  temp: '25˚C',
  fetching: false
};

export default function page(state = initialState, action) {

  switch (action.type) {
    case SET_CITY:
      return {...state, city: action.payload, fetching: true};

    case GET_TEMP_SUCCESS:
      return {...state, temp: action.payload, fetching: false};

    default:
      return state;
  }

}
