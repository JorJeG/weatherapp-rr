import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
//   getInititalState() {
//     return { visible: false }
//   }
  addCity() {
    if (!this.cityInput.value.trim()) {
      return
    }
    this.props.onAddCity(this.cityInput.value);
    this.cityInput.value = '';
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
        name,
        visible: false
      };
      dispatch({ type: 'ADD_CITY', payload });
    }
  })
)(App);
