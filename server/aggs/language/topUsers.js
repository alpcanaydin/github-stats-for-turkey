module.exports = async (db, language, limit = 30) => {
  const pipeline = [
    { $match: { language } },
    { $group: { _id: '$user', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
  ];
  const users = await db.get('repos').aggregate(pipeline);

  return users.map(user => ({
    /* eslint-disable no-underscore-dangle */
    user: user._id,
    /* eslint-enable */
    count: user.count,
  }));
};
