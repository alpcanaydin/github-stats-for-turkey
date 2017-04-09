import React from 'react';
import PropTypes from 'prop-types';

const DeveloperTopStarredRepos = ({ data }) => (
  <div>
    <h1 className="title">En Çok Star Alan Repolar</h1>
    <h2 className="subtitle">
      Bu geliştiricinin en çok start alan repoları
    </h2>
    <hr />

    {data.length > 0 &&
      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Sıra</th>
            <th style={{ width: '40%' }}>Repo</th>
            <th style={{ width: '20%' }}>Dil</th>
            <th style={{ width: '15%' }}>Star</th>
            <th style={{ width: '15%' }}>Fork</th>
          </tr>
        </thead>
        <tbody>
          {data.map((repo, index) => (
            <tr key={repo.fullName}>
              <th>{index + 1}</th>
              <td>
                <a
                  href={`https://github.com/${repo.fullName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </td>
              <td>{repo.language || '-'}</td>
              <td>{repo.stars.toLocaleString()}</td>
              <td>{repo.forks.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>}

    {data.length === 0 && <p>{name} için bu bilgisi bulunmuyor.</p>}
  </div>
);

DeveloperTopStarredRepos.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DeveloperTopStarredRepos;
