import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../components/User';
import Page from '../components/Page';
import * as pageActions from '../actions/PageActions';

class App extends Component {
  render() {
    const { user, page } = this.props;
    const { setCity } = this.props.pageActions;

    return (
      <div className="row">
        <User name={user.name} />
        <Page temp={page.temp} city={page.city} setCity={setCity} fetching={page.fetching} />
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
