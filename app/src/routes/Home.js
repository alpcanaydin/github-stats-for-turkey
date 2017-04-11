import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Splash from '../components/Splash';
import TurkeyMap from '../components/TurkeyMap';
import UserSearch from '../components/UserSearch';
import YearRange from '../components/YearRange';
import { filterByYear } from '../redux/modules/location/list';
import { API_STATUS } from '../util/api';
import { isLoading } from '../util/stateHelpers';

const Home = ({ dispatch, location, locations, turkey, topUsers }) => (
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
            <br />
            <small>
              Geliştirici verileri için aşağıya kaydırın.
            </small>
          </h2>

          <TurkeyMap stats={locations.data} loading={isLoading(locations)} />

          <YearRange
            disabled={isLoading(locations)}
            min={locations.filters.year.min}
            max={locations.filters.year.max}
            onChange={filter => { dispatch(filterByYear(filter)); }}
          />
        </div>
      </div>
    </section>

    <div id="developers">
      <UserSearch topUsers={topUsers} />
    </div>
  </div>
);

Home.propTypes = {
  locations: PropTypes.shape({
    data: PropTypes.array,
    status: PropTypes.oneOf(Object.keys(API_STATUS)),
    filter: PropTypes.object,
  }).isRequired,
  turkey: PropTypes.object.isRequired,
  topUsers: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(state => ({
  locations: state.location.list,
  turkey: state.initial.turkey,
  topUsers: state.initial.topUsers,
}))(Home);
