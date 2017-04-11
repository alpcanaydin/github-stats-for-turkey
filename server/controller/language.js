const reposAgg = require('../aggs/language/repos');
const usersAgg = require('../aggs/language/users');
const topLocationsAgg = require('../aggs/language/topLocations');
const topStarredReposAgg = require('../aggs/language/topStarredRepos');
const topUsersAgg = require('../aggs/language/topUsers');
const getPositionAgg = require('../aggs/language/getPosition');
const getPositionByCountAgg = require('../aggs/language/getPositionByCount');

module.exports = async (req, res) => {
  const language = req.params.language;

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
