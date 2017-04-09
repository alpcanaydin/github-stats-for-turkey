import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { emptyStateItem, isInit, isLoading, isFailed } from '../util/stateHelpers';
import { request, fail } from '../redux/modules/location';

import LocationGeneral from './LocationGeneral';
import LocationLanguage from './LocationLanguage';
import LocationMostStarredDevelopers from './LocationMostStarredDevelopers';
import LocationMostFollowedDevelopers from './LocationMostFollowedDevelopers';
import LocationMostStarredRepos from './LocationMostStarredRepos';

import LocationSidebar from '../components/LocationSidebar';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Nav from '../components/Nav';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';

import citiesData from '../data/svgCities.json';

class LocationDetail extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps);
  }

  load(props) {
    const { match, location } = props;
    const cities = [...citiesData, { id: 'turkey', name: 'Türkiye' }];

    this.currentCity = cities.find(city => city.id === match.params.location);

    if (!this.currentCity) {
      this.props.fail(match.params.location, 'Not found');
      return;
    }

    if (isInit(location)) {
      this.props.request(match.params.location);
    }
  }

  render() {
    const { match, location } = this.props;

    if (isFailed(location)) {
      return <NotFound />;
    }

    const router = (
      <div>
        <Switch>
          <Route
            exact
            path="/location/:location"
            render={() => (
              <LocationGeneral
                name={this.currentCity.name}
                data={location.data.location}
                positions={location.data.positions}
              />
            )}
          />
          <Route
            exact
            path="/location/:location/languages"
            render={() => (
              <LocationLanguage
                name={this.currentCity.name}
                data={location.data.stats.topLanguages}
              />
            )}
          />
          <Route
            exact
            path="/location/:location/most-starred-developers"
            render={() => (
              <LocationMostStarredDevelopers
                name={this.currentCity.name}
                data={location.data.stats.topStarredUsers}
              />
            )}
          />
          <Route
            exact
            path="/location/:location/most-followed-developers"
            render={() => (
              <LocationMostFollowedDevelopers
                name={this.currentCity.name}
                data={location.data.stats.topFollowedUsers}
              />
            )}
          />
          <Route
            exact
            path="/location/:location/most-starred-repos"
            render={() => (
              <LocationMostStarredRepos
                name={this.currentCity.name}
                data={location.data.stats.topStarredRepos}
              />
            )}
          />
        </Switch>
      </div>
    );

    return (
      <div>
        <ScrollToTopOnMount />
        <Nav />

        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.currentCity && this.currentCity.name} İstatistikleri
              </h1>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <LocationSidebar params={match.params} />
              </div>
              <div className="column">
                {isLoading(location) ? <Loading /> : router}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

LocationDetail.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
};

export default connect(
  (state, { match }) => ({
    location: state.location[match.params.location] || emptyStateItem,
  }),
  dispatch => bindActionCreators({ request, fail }, dispatch),
)(LocationDetail);
