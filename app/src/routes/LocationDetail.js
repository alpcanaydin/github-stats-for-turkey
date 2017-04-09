import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import LocationGeneral from './LocationGeneral';
import LocationLanguage from './LocationLanguage';

import LocationSidebar from '../components/LocationSidebar';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Nav from '../components/Nav';

const LocationDetail = ({ match }) => (
  <div>
    <ScrollToTopOnMount />
    <Nav />

    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            İzmir İstatistikleri
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
            <Redirect
              from="/location/:location"
              to={`/location/${match.params.location}/general`}
            />
            <Switch>
              <Route exact path="/location/:location" component={LocationGeneral} />
              <Route exact path="/location/:location/general" component={LocationGeneral} />
              <Route exact path="/location/:location/languages" component={LocationLanguage} />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  </div>
);

LocationDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default LocationDetail;
