module.exports = async (db, language) => {
  const pipeline = [
    { $match: { language: { $ne: null } } },
    { $group: { _id: '$language', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ];

  const data = await db.get('repos').aggregate(pipeline);

  /* eslint-disable no-underscore-dangle */
  return data.map(item => item._id).indexOf(language) + 1;
};
