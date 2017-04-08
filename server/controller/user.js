const topLanguagesAgg = require('../aggs/user/topLanguages');
const topStarredReposAgg = require('../aggs/user/topStarredRepos');
const getPositionAgg = require('../aggs/user/getPosition');

module.exports = async (req, res) => {
  const username = req.params.username;
  const user = await req.db.get('users').findOne({ username });

  if (!user) {
    res.status(404).json({ message: 'User could not be found.' });
    return;
  }

  const promises = [
    topLanguagesAgg(req.db, username),
    topStarredReposAgg(req.db, username),

    getPositionAgg(req.db, 'turkey', 'score', user.score),
    getPositionAgg(req.db, user.city, 'score', user.score),

    getPositionAgg(req.db, 'turkey', 'stars', user.stars),
    getPositionAgg(req.db, user.city, 'stars', user.stars),

    getPositionAgg(req.db, 'turkey', 'followers', user.followers),
    getPositionAgg(req.db, user.city, 'followers', user.followers),
  ];

  // prettier-ignore
  const [
    topLanguages,
    topStarredRepos,
    scorePositionInTurkey,
    scorePositionInCity,
    starsPositionInTurkey,
    starsPositionInCity,
    followersPositionInTurkey,
    followersPositionInCity,
  ] = await Promise.all(promises);

  res.json({
    user,
    stats: {
      topLanguages,
      topStarredRepos,
    },
    positions: {
      score: {
        turkey: scorePositionInTurkey,
        city: scorePositionInCity,
      },

      stars: {
        turkey: starsPositionInTurkey,
        city: starsPositionInCity,
      },

      followers: {
        turkey: followersPositionInTurkey,
        city: followersPositionInCity,
      },
    },
  });
};
