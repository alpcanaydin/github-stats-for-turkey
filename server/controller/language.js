const reposAgg = require('../aggs/language/repos');
const usersAgg = require('../aggs/language/users');
const topLocationsAgg = require('../aggs/language/topLocations');
const topStarredReposAgg = require('../aggs/language/topStarredRepos');
const topUsersAgg = require('../aggs/language/topUsers');
const getPositionAgg = require('../aggs/language/getPosition');
const getPositionByCountAgg = require('../aggs/language/getPositionByCount');

module.exports = async (req, res) => {
  let language = req.params.language;

  if (language === 'C-Sharp') {
    language = 'C#';
  }

  const promises = [
    reposAgg(req.db, language),
    usersAgg(req.db, language),
    topLocationsAgg(req.db, language),
    topStarredReposAgg(req.db, language),
    topUsersAgg(req.db, language),

    getPositionAgg(req.db, language),
    getPositionByCountAgg(req.db, language),
  ];

  // prettier-ignore
  const [
    repos,
    users,
    topLocations,
    topStarredRepos,
    topUsers,
    position,
    positionByCount,
  ] = await Promise.all(promises);

  if (repos === 0) {
    res.status(404).json({ message: 'Language could not be found.' });
    return;
  }

  res.json({
    language: {
      language,
      repos,
      users,
    },
    stats: {
      topLocations,
      topUsers,
      topStarredRepos,
    },
    positions: {
      repos: positionByCount,
      stars: position,
    },
  });
};
