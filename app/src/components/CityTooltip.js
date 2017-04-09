import React from 'react';
import PropTypes from 'prop-types';

import './CityTooltip.css';

const CityTooltip = ({ city, top, left }) => (
  <div className="CityTooltip" style={{ top: `${top}px`, left: `${left}px` }}>
    <div className="notification is-dark">
      <div className="content">
        <p>
          <span className="icon">
            <i className="fa fa-map-marker" />
          </span>
          {city.name}
        </p>
        <p>
          <span className="icon">
            <i className="fa fa-code" />
          </span>
          {city.topLanguage || 'Bilinmiyor'}
        </p>
        <p>
          <span className="icon">
            <i className="fa fa-user" />
          </span>
          {city.users.toLocaleString()} Geliştirici
        </p>
        <p>
          <span className="icon">
            <i className="fa fa-database" />
          </span>
          {city.repos.toLocaleString()} Repo
        </p>
      </div>
    </div>

  </div>
);

CityTooltip.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shape: PropTypes.isRequired,
    fill: PropTypes.string,
    topLanguage: PropTypes.string,
    users: PropTypes.number.isRequired,
    repos: PropTypes.number.isRequired,
  }).isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};

export default CityTooltip;
