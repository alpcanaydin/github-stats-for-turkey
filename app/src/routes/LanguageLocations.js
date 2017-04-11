import React from 'react';
import PropTypes from 'prop-types';

import svgCities from '../data/svgCities.json';

const findCity = id => {
  const city = svgCities.find(item => item.id === id);

  return city ? city.name : id;
};

const LocationLanguages = ({ data, name }) => (
  <div>
    <h1 className="title">En Çok Kullanan Şehirler</h1>
    <h2 className="subtitle">
      {name} dilini en çok kullanan şehirler
    </h2>
    <hr />

    {data.length > 0 &&
      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Sıra</th>
            <th style={{ width: '80%' }}>Şehir</th>
            <th style={{ width: '10%' }}>Repo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((location, index) => (
            <tr key={location.location}>
              <th>{index + 1}</th>
              <td>{findCity(location.location)}</td>
              <th>{location.count}</th>
            </tr>
          ))}
        </tbody>
      </table>}

    {data.length === 0 && <p>Bu dil için şehir istatistik bilgisi bulunmuyor.</p>}
  </div>
);

LocationLanguages.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default LocationLanguages;
