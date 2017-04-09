import React from 'react';
import PropTypes from 'prop-types';

const LocationLanguage = ({ name, data }) => (
  <div>
    <h1 className="title">Dil Kullanımı</h1>
    <h2 className="subtitle">
      {name} için en çok kullanılan diller
    </h2>
    <hr />

    {data.length > 0 &&
      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Sıra</th>
            <th style={{ width: '80%' }}>Dil</th>
            <th style={{ width: '10%' }}>Repo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((language, index) => (
            <tr key={language.language}>
              <th>{index + 1}</th>
              <td>{language.language}</td>
              <th>{language.count}</th>
            </tr>
          ))}
        </tbody>
      </table>}

    {data.length === 0 && <p>Bu şehir için dil kullanım bilgisi bulunmuyor.</p>}
  </div>
);

LocationLanguage.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default LocationLanguage;
