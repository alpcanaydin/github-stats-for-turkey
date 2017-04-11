import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LanguageMostActiveDevelopers = ({ name, data }) => (
  <div>
    <h1 className="title">En Çok Kullanan Geliştiriciler</h1>
    <h2 className="subtitle">
      {name} dilini en çok kullanan geliştiriciler
    </h2>
    <hr />

    {data.length > 0 &&
      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Sıra</th>
            <th style={{ width: '80%' }}>Geliştirici</th>
            <th style={{ width: '10%' }}>Repo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.user}>
              <th>{index + 1}</th>
              <td><Link to={`/developer/${user.user}`}>{user.user}</Link></td>
              <th>{user.count}</th>
            </tr>
          ))}
        </tbody>
      </table>}

    {data.length === 0 && <p>Bu dil için geliştirici istatistik bilgisi bulunmuyor.</p>}
  </div>
);

LanguageMostActiveDevelopers.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default LanguageMostActiveDevelopers;
