const topLanguagesAgg = require('../aggs/location/topLanguages');
const topRankedUsersAgg = require('../aggs/location/topRankedUsers');
const topStarredUsersAgg = require('../aggs/location/topStarredUsers');
const topFollowedUsersAgg = require('../aggs/location/topFollowedUsers');
const topStarredReposAgg = require('../aggs/location/topStarredRepos');
const getPositionAgg = require('../aggs/location/getPosition');

module.exports = async (req, res) => {
  const locationParam = req.params.location;
  const location = await req.db.get('locations').findOne({ location: locationParam });

  if (!location) {
    res.status(404).json({ message: 'Location could not be found.' });
    return;
  }

  const promises = [
    topLanguagesAgg(req.db, locationParam),
    topRankedUsersAgg(req.db, locationParam),
    topStarredUsersAgg(req.db, locationParam),
    topFollowedUsersAgg(req.db, locationParam),
    topStarredReposAgg(req.db, locationParam),
    getPositionAgg(req.db, locationParam, 'score'),
    getPositionAgg(req.db, locationParam, 'stars'),
    getPositionAgg(req.db, locationParam, 'followers'),
  ];

  // prettier-ignore
  const [
    topLanguages,
    topRankedUsers,
    topStarredUsers,
    topFollowedUsers,
    topStarredRepos,
    scorePosition,
    starsPosition,
    followersPosition,
  ] = await Promise.all(promises);

  res.json({
    location,
    stats: {
      topRankedUsers,
      topLanguages,
      topStarredUsers,
      topFollowedUsers,
      topStarredRepos,
    },
    positions: {
      score: scorePosition,
      stars: starsPosition,
      followers: followersPosition,
    },
  });
};
