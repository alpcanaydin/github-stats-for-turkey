import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LanguageMostStarredRepos = ({ name, data }) => (
  <div>
    <h1 className="title">En Çok Star Alan Repolar</h1>
    <h2 className="subtitle">
      {name} dili ile yazılmış ve en çok star alan repolar
    </h2>
    <hr />

    {data.length > 0 &&
      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Sıra</th>
            <th style={{ width: '20%' }}>Geliştirici</th>
            <th style={{ width: '60%' }}>Repo</th>
            <th style={{ width: '10%' }}>Star</th>
            <th style={{ width: '10%' }}>Fork</th>
          </tr>
        </thead>
        <tbody>
          {data.map((repo, index) => (
            <tr key={repo.fullName}>
              <th>{index + 1}</th>
              <td><Link to={`/developer/${repo.user}`}>{repo.user}</Link></td>
              <td>
                <a
                  href={`https://github.com/${repo.fullName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.fullName}
                </a>
              </td>
              <td>{repo.stars.toLocaleString()}</td>
              <td>{repo.forks.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>}

    {data.length === 0 && <p>{name} için bu bilgi bulunmuyor.</p>}
  </div>
);

LanguageMostStarredRepos.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default LanguageMostStarredRepos;
