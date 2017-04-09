import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Home.css';

import Splash from '../components/Splash';
import TurkeyMap from '../components/TurkeyMap';

const Home = ({ locations, turkey }) => (
  <div>
    <Splash data={turkey} />

    <section className="hero is-fullheight" id="map">
      <div className="hero-body">
        <div className="container" style={{ position: 'static' }}>
          <h1 className="title has-text-centered">
            Genel Türkiye İstatistikleri
          </h1>
          <TurkeyMap stats={locations} />
        </div>
      </div>
    </section>
  </div>
);

Home.propTypes = {
  locations: PropTypes.array.isRequired,
  turkey: PropTypes.object.isRequired,
};

export default connect(state => ({
  locations: state.initial.locations,
  turkey: state.initial.turkey,
}))(Home);
