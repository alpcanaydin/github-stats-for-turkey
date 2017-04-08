module.exports = async (db, location, limit = 50) => {
  const defaultMatch = { language: { $ne: null } };
  const cityMatch = location === 'turkey' ? {} : { city: location };

  const $match = Object.assign(defaultMatch, cityMatch);

  const pipeline = [
    { $match },
    { $group: { _id: '$language', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
  ];
  const languages = await db.get('repos').aggregate(pipeline);

  return languages.map(language => ({
    /* eslint-disable no-underscore-dangle */
    language: language._id,
    /* eslint-enable */
    count: language.count,
  }));
};
