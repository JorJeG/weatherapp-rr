import {
  SET_CITY,
  GET_TEMP_SUCCESS } from '../constants/Page';

export function setCity(city) {
  const temper = Math.round(Math.random()*10) + '˚C';
  return (dispatch) => {
    dispatch({
      type: SET_CITY,
      payload: city
    })

    setTimeout(() => {
      dispatch({
        type: GET_TEMP_SUCCESS,
        payload: temper
      })
    }, 1000)
  };

}
