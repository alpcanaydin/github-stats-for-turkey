import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import City from './City';
import CityTooltip from './CityTooltip';

import svgCities from '../data/svgCities.json';

import './TurkeyMap.css';

class TurkeyMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      hoveredCity: {
        city: null,
        top: 0,
        left: 0,
      },
    };

    this.languages = {
      php: '#666699',
      'c#': '#71AAD7',
      css: '#E34E24',
      java: '#3471C0',
      javascript: '#F0DB4F',
      ruby: '#91221a',
      python: '#c68f09',
      swift: '#FD4A33',
      html: '#ff9460',
      'c++': '#01766D',
      scala: '#b55451',
      c: '#A8B9CC',
    };

    this.populateCity = this.populateCity.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleCityMouseMove = this.handleCityMouseMove.bind(this);
    this.handleCityMouseOut = this.handleCityMouseOut.bind(this);
  }

  componentWillMount() {
    const cities = svgCities.map(city => ({
      ...city,
      ...this.populateCity(city.id),
    }));

    this.setState({ cities });
  }

  populateCity(id) {
    const { stats } = this.props;
    const city = stats.find(item => item.location === id);

    if (!city) {
      return {
        fill: '#777',
        topLanguage: 'Bilinmiyor',
        users: 0,
        repos: 0,
      };
    }

    return {
      fill: city.topLanguage ? this.languages[city.topLanguage.toLowerCase()] : '#777',
      topLanguage: city.topLanguage,
      users: city.users,
      repos: city.repos,
    };
  }

  handleCityClick(city) {
    this.props.dispatch(push(`/location/${city.id}`));
  }

  handleCityMouseMove(city, top, left) {
    if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
      return;
    }

    this.setState({ hoveredCity: { city, top, left } });
  }

  handleCityMouseOut() {
    if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
      return;
    }
    this.setState({ hoveredCity: { city: null, top: 0, left: 0 } });
  }

  render() {
    const { cities, hoveredCity } = this.state;

    return (
      <div className="svgContainer">
        {hoveredCity.city &&
          <CityTooltip city={hoveredCity.city} top={hoveredCity.top} left={hoveredCity.left} />}
        <svg
          viewBox="0 0 1007.478 442"
          ref={ref => {
            this.svg = ref;
          }}
        >
          {cities.map(city => (
            <City
              key={city.id}
              data={city}
              onClick={this.handleCityClick}
              onMouseMove={this.handleCityMouseMove}
              onMouseOut={this.handleCityMouseOut}
            />
          ))}
        </svg>
      </div>
    );
  }
}

TurkeyMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stats: PropTypes.array.isRequired,
};

export default connect()(TurkeyMap);
