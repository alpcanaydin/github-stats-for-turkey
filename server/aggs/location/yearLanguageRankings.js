module.exports = async (db, location, minYear, maxYear) => {
  const defaultMatch = { language: { $ne: null } };
  const cityMatch = location === 'turkey' ? {} : { city: location };

  const minYearQuery = minYear ? { $gte: new Date(minYear, 1, 1).toISOString() } : {};
  const maxYearQuery = maxYear ? { $lt: new Date(maxYear, 1, 1).toISOString() } : {};
  const rangeMatch = {
    createdAt: Object.assign({}, minYearQuery, maxYearQuery),
  };

  const $match = Object.assign(defaultMatch, cityMatch, rangeMatch);

  const pipeline = [
    { $match },
    { $group: { _id: '$language', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ];

  const result = await db.get('repos').aggregate(pipeline);
  /* eslint-disable no-underscore-dangle */
  return result.length ? result[0]._id : null;
};
