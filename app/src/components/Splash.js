import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MoveTo from 'moveto';

import './Splash.css';

class Splash extends Component {
  constructor(props) {
    super(props);

    this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {
    if (/cities/gi.test(this.props.location.search)) {
      this.handleMove('cities');
    }

    if (/developers/gi.test(this.props.location.search)) {
      this.handleMove('developers');
    }
  }

  /* eslint-disable class-methods-use-this */
  handleMove(target) {
    const moveTo = new MoveTo();
    moveTo.move(document.getElementById(target));
  }

  render() {
    const { data: turkey } = this.props;

    return (
      <section className="hero is-fullheight is-dark Splash">
        <div className="hero-body">
          <div className="container">
            <p className="title is-1">
              Github Türkiye İstatistikleri
            </p>
            <p className="subtitle">
              Bu çalışma Github üzerinde konumu Türkiye olarak gözüken
              {' '}
              <strong>{turkey.users.toLocaleString()}</strong>
              {' '}
              geliştirici
              ve
              {' '}
              <strong>{turkey.repos.toLocaleString()}</strong>
              {' '}
              repo üzerinde gerçekleştirilmiştir.
            </p>

            <p className="hero-buttons">
              <button
                onClick={() => this.handleMove('cities')}
                className="button is-primary is-medium"
              >
                Şehir İstatistikleri
              </button>

              <button
                onClick={() => this.handleMove('developers')}
                className="button is-primary is-medium"
              >
                Geliştirici İstatistikleri
              </button>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

Splash.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Splash;
