/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = { isMobileMenuOpened: false };

    this.handleMobileMenuVisibility = this.handleMobileMenuVisibility.bind(this);
  }

  handleMobileMenuVisibility() {
    this.setState({ isMobileMenuOpened: !this.state.isMobileMenuOpened });
  }

  render() {
    const { isMobileMenuOpened } = this.state;

    return (
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

          <span className="nav-toggle" onClick={this.handleMobileMenuVisibility}>
            <span />
            <span />
            <span />
          </span>

          <div className={`nav-right nav-menu ${isMobileMenuOpened && 'is-active'}`}>
            <span className="nav-item">
              <a className="button is-dark">
                Kaynak Kodları
              </a>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
