import React from 'react';
import PropTypes from 'prop-types';

import UserCard from '../components/UserCard';

const LocationMostFollowedDevelopers = ({ name, data }) => (
  <div>
    <h1 className="title">En Çok Takipçisi Olan Geliştiriciler</h1>
    <h2 className="subtitle">
      {name} için en çok takipçisi olan geliştiricilerin sıralaması
    </h2>
    <hr />

    {data.length > 0 &&
      <div className="columns is-multiline">
        {data.map((user, index) => (
          <div key={user.username} className="column is-6">
            <UserCard user={user} index={index + 1} />
          </div>
        ))}
      </div>}

    {data.length === 0 && <p>{name} için bu bilgi bulunmuyor.</p>}
  </div>
);

LocationMostFollowedDevelopers.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default LocationMostFollowedDevelopers;
