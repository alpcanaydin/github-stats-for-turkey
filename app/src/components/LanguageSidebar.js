import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const LanguageSidebar = ({ params }) => (
  <aside className="menu">
    <p className="menu-label">
      Genel İstatistikler
    </p>
    <ul className="menu-list">
      <li>
        <NavLink exact to={`/language/${params.language}`} activeClassName="is-active">
          Genel Bilgiler
        </NavLink>
      </li>
      <li>
        <NavLink exact to={`/language/${params.language}/locations`} activeClassName="is-active">
          Şehir Dağılımı
        </NavLink>
      </li>
    </ul>
    <p className="menu-label">
      Geliştiriciler
    </p>
    <ul className="menu-list">
      <NavLink
        exact
        to={`/language/${params.language}/most-active-developers`}
        activeClassName="is-active"
      >
        En Çok Kullanan Geliştiriciler
      </NavLink>
    </ul>
    <p className="menu-label">
      Repolar
    </p>
    <ul className="menu-list">
      <NavLink
        exact
        to={`/language/${params.language}/most-starred-repos`}
        activeClassName="is-active"
      >
        En Çok Star Alan Repolar
      </NavLink>
    </ul>
  </aside>
);

LanguageSidebar.propTypes = {
  params: PropTypes.object.isRequired,
};

export default LanguageSidebar;
