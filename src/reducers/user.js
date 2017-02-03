import {
  ADD_CITY,
  DELETE_CITY
} from '../constants/Page';

const initialState = {
  name: 'Анонимноним'
};

const newCity = (state = {
  id: 0,
  city: '',
  visible: false
}, action) => {
  switch (action.type) {
  case ADD_CITY:
    return {...state, id: action.id, city: action.text, visible: true}
  case DELETE_CITY:
    return {...state, id: action.id, visible:false}
  default:
    return state
  }

}

export default function user() {
  return initialState;
}
