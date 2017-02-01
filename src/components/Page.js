import React, { PropTypes, Component } from 'react';

export default class Page extends Component {
  onCityBtnClick(e) {
    this.props.setCity(e.target.innerText)
  }
  render() {
    const { temp, fetching } = this.props;
    return (
      <div className="page">
        <p>
          <button className="btn" onClick={::this.onCityBtnClick}>Moskow</button>
          <button className="btn" onClick={::this.onCityBtnClick}>Madrid</button>
          <button className="btn" onClick={::this.onCityBtnClick}>Milan</button>
        </p>

        {
          fetching ? <h3>Загрузка</h3>
        :
          <h3>{ temp }</h3>
        }
        {
          fetching ? <p>Загрузка</p>
        :
          <p>Picture</p>
        }
      </div>
    );
  }
}

Page.PropTypes = {
  city: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired
}
