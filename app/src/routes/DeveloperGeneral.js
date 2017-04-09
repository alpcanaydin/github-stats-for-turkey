import React from 'react';
import PropTypes from 'prop-types';

const DeveloperGeneral = ({ data, positions }) => (
  <div className="columns is-multiline">
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">{positions.score.turkey.toLocaleString()}.</p>
        <p className="subtitle">Türkiye Sıralaması</p>
      </div>
    </div>
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">{positions.score.city.toLocaleString()}.</p>
        <p className="subtitle">Şehir Sıralaması</p>
      </div>
    </div>
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">{data.stars.toLocaleString()}</p>
        <p className="subtitle">Star</p>
      </div>
    </div>
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">{data.publicRepos.toLocaleString()}</p>
        <p className="subtitle">Repo</p>
      </div>
    </div>
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">{data.followers.toLocaleString()}</p>
        <p className="subtitle">Takipçi</p>
      </div>
    </div>
    <div className="column is-6">
      <div className="box has-text-centered">
        <p className="title">{data.following.toLocaleString()}</p>
        <p className="subtitle">Takip Edilen</p>
      </div>
    </div>
  </div>
);

DeveloperGeneral.propTypes = {
  data: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
};

export default DeveloperGeneral;
