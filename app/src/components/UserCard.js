import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './UserCard.css';

const UserCard = ({ user, index }) => (
  <div className="card UserCard">
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={user.avatarUrl} alt="Profil resmi" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">{user.name}</p>
          <p className="subtitle is-6">
            <a
              href={`https://github.com/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="githubLink"
            >
              @{user.username}
            </a>
          </p>
        </div>
        <div className="media-right">
          <p className="title is-2">{index}</p>
        </div>
      </div>
    </div>
    <footer className="card-footer">
      <Link to={`/developer/${user.username}`} className="card-footer-item footerLink">
        Görüntüle
      </Link>
      <span className="card-footer-item">
        <span className="icon is-small">
          <i className="fa fa-star" />
        </span>
        <span style={{ paddingLeft: '5px' }}>{user.stars} Star</span>
      </span>
      <span className="card-footer-item">
        <span className="icon is-small">
          <i className="fa fa-user-circle-o" />
        </span>
        <span style={{ paddingLeft: '5px' }}>{user.followers} Takipçi</span>
      </span>
    </footer>
  </div>
);

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default UserCard;
