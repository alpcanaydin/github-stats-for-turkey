import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Splash from '../components/Splash';
import TurkeyMap from '../components/TurkeyMap';
import UserSearch from '../components/UserSearch';

const Home = ({ location, locations, turkey, topUsers }) => (
  <div>
    <Splash data={turkey} location={location} />

    <section className="hero is-fullheight" id="cities">
      <div className="hero-body">
        <div className="container" style={{ position: 'static' }}>
          <h1 className="title has-text-centered">
            İllere Göre Dil Dağılımı
          </h1>
          <h2 className="subtitle has-text-centered">
            Detaylı bilgi için şehirlere tıklayabilirsiniz. Tüm Türkiye verisi
            için <Link to="/location/turkey">tıklayınız</Link>.
          </h2>
          <TurkeyMap stats={locations} />
        </div>
      </div>
    </section>

    <div id="developers">
      <UserSearch topUsers={topUsers} />
    </div>
  </div>
);

Home.propTypes = {
  locations: PropTypes.array.isRequired,
  turkey: PropTypes.object.isRequired,
  topUsers: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(state => ({
  locations: state.initial.locations,
  turkey: state.initial.turkey,
  topUsers: state.initial.topUsers,
}))(Home);
