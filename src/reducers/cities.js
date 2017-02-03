const initialState = [];

export default function cities(state = initialState, action) {
  switch(action.type) {
  case 'ADD_CITY':
    return [
      ...state, action.payload
    ];
  default:
    return state;
  }
}
