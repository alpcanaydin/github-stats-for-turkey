import React from 'react';
import PropTypes from 'prop-types';

const LocationGeneral = ({ name, data, positions }) => (
  <div>
    <h1 className="title">{name}</h1>
    <h2 className="subtitle">
      {name} için genel istatistikler
    </h2>
    <hr />

    <div className="columns is-multiline">
      <div className="column is-6">
        <div className="box has-text-centered">
          <p className="title">{data.users.toLocaleString()}</p>
          <p className="subtitle">Geliştirici</p>
        </div>
      </div>
      <div className="column is-6">
        <div className="box has-text-centered">
          <p className="title">{data.repos.toLocaleString()}</p>
          <p className="subtitle">Repo</p>
        </div>
      </div>
      {name !== 'Türkiye' &&
        <div className="column is-6">
          <div className="box has-text-centered">
            <p className="title">
              {positions.score > 0 ? `${positions.score.toLocaleString()}.` : '-'}
            </p>
            <p className="subtitle">En Aktif Şehir</p>
          </div>
        </div>}
      <div className={`column ${name === 'Türkiye' ? 'is-12' : 'is-6'}`}>
        <div className="box has-text-centered">
          <p className="title">{data.topLanguage || 'Bilinmiyor'}</p>
          <p className="subtitle">En Sevilen Dil</p>
        </div>
      </div>
    </div>
  </div>
);

LocationGeneral.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
};

export default LocationGeneral;
