import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <strong>Github Türkiye İstatisikleri</strong>
        <p>
          <small>
            Kaynak kodları <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
            &nbsp;ile lisanslanmıştır.
          </small>
        </p>
        <p>
          <a className="icon is-dark" href="https://github.com/alpcanaydin/github-stats-for-turkey">
            <i className="fa fa-github" />
          </a>
          <a className="icon is-dark" href="https://twitter.com/alpcanaydin">
            <i className="fa fa-twitter" />
          </a>
        </p>
        <p>
          <small>Veri en son <strong>8 Nisan 2017</strong> tarihinde çekilmiştir.</small>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
