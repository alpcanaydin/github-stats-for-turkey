module.exports = async (db, username, limit = 50) => {
  const pipeline = [
    { $match: { language: { $ne: null }, user: username } },
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
