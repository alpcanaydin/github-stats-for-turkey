import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="nav has-shadow">
    <div className="container">
      <div className="nav-left">
        <Link to="/" className="nav-item is-brand">
          <span className="icon is-medium">
            <i className="fa fa-github" />
          </span>
          <span style={{ paddingLeft: '5px' }}>Github Türkiye İstatistikleri</span>
        </Link>
      </div>

      <div className="nav-right nav-menu">
        <span className="nav-item">
          <a className="button is-dark">
            Kaynak Kodları
          </a>
        </span>
      </div>
    </div>
  </nav>
);

export default Nav;
