import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const LocationSidebar = ({ params }) => (
  <aside className="menu">
    <p className="menu-label">
      Genel İstatistikler
    </p>
    <ul className="menu-list">
      <li>
        <NavLink to={`/location/${params.location}/general`} activeClassName="is-active">
          Genel Bilgiler
        </NavLink>
      </li>
      <li>
        <NavLink to={`/location/${params.location}/languages`} activeClassName="is-active">
          Dil Kullanımı
        </NavLink>
      </li>
    </ul>
    <p className="menu-label">
      Geliştiriciler
    </p>
    <ul className="menu-list">
      <li><a>En Çok Star Alan Geliştiriciler</a></li>
      <li><a>En Çok Takip Edilen Geliştiriciler</a></li>
    </ul>
    <p className="menu-label">
      Repolar
    </p>
    <ul className="menu-list">
      <li><a>En Çok Star Alan Repolar</a></li>
    </ul>
  </aside>
);

LocationSidebar.propTypes = {
  params: PropTypes.object.isRequired,
};

export default LocationSidebar;
