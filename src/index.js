import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers,
         applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';

import './index.css';


const actionLogger = ({dispatch, getState}) =>
  (next) => (action) =>
    {console.log(action); return next(action) }

const city = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CITY':
      return {
        id: action.id,
        text: action.text
      };
    default: return state;
  }
};

const cities = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CITY':
      return [
        ...state,
        city(undefined, action)
      ];
      case 'REMOVE_CITY':
        return state.map(city => {   // чтобы не менять массив
          if (city.id !== action.id) {
            return city;
          }
          return {
            ...city,
            visible: !city.visible
          };
        });
    default:
      return state;
  }
};

const reducers = combineReducers({
  cities: cities
});

const middleware = composeWithDevTools(applyMiddleware(actionLogger));

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  middleware
)

class CityApp extends Component {
  render() {
    return (
      <div className="row search">
        <div className="col-md-4">
          <div className="row">
            <input className="col-sm-8" ref={node => this.input = node } />
            <button className="btn btn-primary col-sm-4" onClick={() => {
              if (this.input.value.trim()){
              store.dispatch({
                type: 'ADD_CITY',
                text: this.input.value,
                visible: false,
                id: Date.now().toString()
              });
              this.input.value = '';}
            }}>
              ADD CITY
            </button>
          </div>
          <ul className="list-group row">
            {this.props.cities.map(city =>
              <li key={city.id}
                  style={{display:
                      city.visible ?
                        'none' :
                        ''}}
                  className="list-group-item col-sm-12">
                {city.text}
                {' '}
                <button
                  className="btn btn-danger pull-right"
                  onClick={() => {
                    store.dispatch({
                    type: 'REMOVE_CITY',
                    id: city.id
                  });
                }}>
                  <span className="glyphicon glyphicon-remove"></span></button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <CityApp
      cities={store.getState().cities}
    />,
    document.getElementById('root')
  )
};

render()
store.subscribe(render);
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));
