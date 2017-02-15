import React from 'react';
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
        return [
          ...state.slice(0,action.i),
          ...state.slice(action.i + 1)
        ];
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
);

const CityApp = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    const city = this.input.value;
    if(city.trim()) {
      store.dispatch({
        type: 'ADD_CITY',
        text: city,
        visible: false,
        id: Date.now().toString()
      });
    }
    this.input.value = '';
  },

  render() {
    return (
      <div className="search">
            {this.props.cities.map((city, i) =>
              <div
                key={city.id}
                className="cityContainer">
                <div className="city">
                  <p className="nameCity">{city.text}</p>
                  <p className="temperature">10˚C</p>
                  <p className="something">Picture</p>
                </div>
                <p
                  className="button"
                  onClick={() => {
                    store.dispatch({
                    type: 'REMOVE_CITY',
                    id: city.id,
                    i
                    });
                  }}>&times;
                </p>
              </div>
            )}
            <div
              className="searchItem">
              <form
                className=""
                onSubmit={this.handleSubmit}>
                <input
                  className=""
                  ref={(node) => { this.input = node; }}
                required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>add city</label>
              </form>
            </div>
      </div>
    );
  }});

const render = () => {
  ReactDOM.render(
    <CityApp
      cities={store.getState().cities}
    />,
    document.getElementById('root')
  )
};

render();
store.subscribe(render);
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));
