import React from 'react';
import PropTypes from 'prop-types';
import Scrollchor from 'react-scrollchor';

const Splash = ({ data: turkey }) => (
  <section className="hero is-fullheight is-dark Splash">
    <div className="hero-body">
      <div className="container">
        <p className="title is-1">
          Github Türkiye İstatistikleri
        </p>
        <p className="subtitle">
          Bu çalışma Github üzerinde lokasyonu Türkiye olarak gözüken
          {' '}
          <strong>{turkey.users.toLocaleString()}</strong>
          {' '}
          geliştirici
          ve <strong>{turkey.repos.toLocaleString()}</strong> repo üzerinde gerçekleştirilmiştir.
        </p>

        <p className="hero-buttons">
          <Scrollchor to="map" className="button is-primary is-medium">
            İstatistikleri Görüntüle
          </Scrollchor>

          <a
            href="/deneme"
            target="_blank"
            rel="noopener noreferrer"
            className="button is-link is-medium"
          >
            Blog yazısını oku
          </a>
        </p>
      </div>
    </div>
  </section>
);

Splash.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Splash;
