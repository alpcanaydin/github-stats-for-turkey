const yearLanguageRankingsAgg = require('../aggs/location/yearLanguageRankings');
const yearUserCountsAgg = require('../aggs/location/yearUserCounts');
const yearRepoCountsAgg = require('../aggs/location/yearRepoCounts');

module.exports = async (req, res) => {
  const { minYear, maxYear } = req.query;

  if (!minYear || !maxYear) {
    res.json({ message: 'You have to send min or max year.' });
    return;
  }

  if (minYear && !/^\d{4}$/.test(minYear)) {
    res.json({ message: 'Not a valid min year. ex: 2016.' });
    return;
  }

  if (maxYear && !/^\d{4}$/.test(maxYear)) {
    res.json({ message: 'Not a valid min year. ex: 2016.' });
    return;
  }

  const min = parseInt(minYear, 10);
  const max = parseInt(maxYear, 10) + 1;

  const locations = await req.db.get('locations').find({});

  const promises = [];
  locations.forEach(location => {
    const cityPromise = Promise.all([
      location,
      yearLanguageRankingsAgg(req.db, location.location, min, max),
      yearUserCountsAgg(req.db, location.location, min, max),
      yearRepoCountsAgg(req.db, location.location, min, max),
    ]);
    promises.push(cityPromise);
  });

  const results = await Promise.all(promises);
  const response = results.map(([location, topLanguage, users, repos]) => ({
    /* eslint-disable no-underscore-dangle */
    _id: location._id,
    location: location.location,
    topLanguage,
    users,
    repos,
  }));

  res.json({ locations: response });
};
