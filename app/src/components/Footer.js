import React from 'react';

import Share from './Share';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <strong>Github Türkiye İstatisikleri</strong>
        <p>
          <small>
            Kaynak kodları
            {' '}
            <a
              href="http://opensource.org/licenses/mit-license.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT
            </a>
            {' '}
            ile lisanslanmıştır.
          </small>
        </p>
        <p>
          <a
            className="icon"
            href="https://github.com/alpcanaydin/github-stats-for-turkey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github" />
          </a>
          <a
            className="icon"
            href="https://twitter.com/alpcanaydin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter" />
          </a>
        </p>
        <Share />
        <p>
          <small>Veri en son <strong>8 Nisan 2017</strong> tarihinde çekilmiştir.</small>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
