module.exports = async (db, language, limit = 30) => {
  const pipeline = [
    { $match: { language } },
    { $group: { _id: '$city', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
  ];
  const locations = await db.get('repos').aggregate(pipeline);

  return locations.map(location => ({
    /* eslint-disable no-underscore-dangle */
    location: location._id,
    /* eslint-enable */
    count: location.count,
  }));
};
