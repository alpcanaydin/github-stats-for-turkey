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
        <NavLink exact to={`/location/${params.location}`} activeClassName="is-active">
          Genel Bilgiler
        </NavLink>
      </li>
      <li>
        <NavLink exact to={`/location/${params.location}/languages`} activeClassName="is-active">
          Dil Kullanımı
        </NavLink>
      </li>
    </ul>
    <p className="menu-label">
      Geliştiriciler
    </p>
    <ul className="menu-list">
      <NavLink
        exact
        to={`/location/${params.location}/most-starred-developers`}
        activeClassName="is-active"
      >
        En Çok Star Alan Geliştiriciler
      </NavLink>
      <NavLink
        exact
        to={`/location/${params.location}/most-followed-developers`}
        activeClassName="is-active"
      >
        En Çok Takip Edilen Geliştiriciler
      </NavLink>
    </ul>
    <p className="menu-label">
      Repolar
    </p>
    <ul className="menu-list">
      <NavLink
        exact
        to={`/location/${params.location}/most-starred-repos`}
        activeClassName="is-active"
      >
        En Çok Star Alan Repolar
      </NavLink>
    </ul>
  </aside>
);

LocationSidebar.propTypes = {
  params: PropTypes.object.isRequired,
};

export default LocationSidebar;
