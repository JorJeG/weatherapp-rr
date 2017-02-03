import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  addCity() {
    this.props.onAddCity(this.cityInput.value);
    this.cityInput.value = '';
  }
  showWeather(e) {
    console.log('city name is', e.target.innerText.toLowerCase());
    this.props.onShowWeather(e.target.innerText);
  }
  render() {
    return (
      <div className="app">
        <div className="input">
          <input type="text" placeholder="название города" ref={(input) => { this.cityInput = input}} />
          <button onClick={this.addCity.bind(this)}>Add city</button>
        </div>
        <ul className="user">
          {this.props.cities.map((city) =>
              <li
                className="btn"
                key={city.id}
                onClick={this.showWeather}
                >
                {city.name}
              </li>
          )}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    cities: state.cities
  }),
  dispatch => ({
    onAddCity: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      };
      dispatch({ type: 'ADD_CITY', payload });
    }
    // onShowWeather: (name) => {
    //   const payload = {
    //     name
    //   };
    //   dispatch({ type: 'SELECT_CITY', payload });
    // }
  })
)(App);
