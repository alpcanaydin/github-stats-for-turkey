import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const DeveloperSidebar = ({ params }) => (
  <aside className="menu">
    <p className="menu-label">
      Detaylar
    </p>
    <ul className="menu-list">
      <li>
        <NavLink exact to={`/developer/${params.developer}`} activeClassName="is-active">
          Genel Bilgiler
        </NavLink>
      </li>
      <li>
        <NavLink exact to={`/developer/${params.developer}/languages`} activeClassName="is-active">
          Dil Kullanımı
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to={`/developer/${params.developer}/most-starred-repos`}
          activeClassName="is-active"
        >
          En Çok Star Alan Repolar
        </NavLink>
      </li>
    </ul>
  </aside>
);

DeveloperSidebar.propTypes = {
  params: PropTypes.object.isRequired,
};

export default DeveloperSidebar;
