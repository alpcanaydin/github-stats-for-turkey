import React from 'react';
import { Link } from 'react-router-dom';

import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Nav from '../components/Nav';

const NotFound = () => (
  <div>
    <ScrollToTopOnMount />
    <Nav />

    <section className="hero is-medium">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Aradığınız içerik bulunamadı</h1>
          <Link to="/">Anasayfaya Dön</Link>
        </div>
      </div>
    </section>
  </div>
);

export default NotFound;
