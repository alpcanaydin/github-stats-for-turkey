import React from 'react';
import PropTypes from 'prop-types';

const LanguageGeneral = ({ data, positions }) => (
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
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">
          {positions.stars > 0 ? `${positions.stars.toLocaleString()}.` : '-'}
        </p>
        <p className="subtitle">Türkiye Star Sıralaması</p>
      </div>
    </div>
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">
          {positions.repos > 0 ? `${positions.repos.toLocaleString()}.` : '-'}
        </p>
        <p className="subtitle">Türkiye Repo Sayısı Sıralaması</p>
      </div>
    </div>
  </div>
);

LanguageGeneral.propTypes = {
  data: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
};

export default LanguageGeneral;
