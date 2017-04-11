module.exports = async (db, language) => {
  const pipeline = [
    { $match: { language: { $ne: null } } },
    { $group: { _id: '$language', score: { $sum: `$stars` } } },
    { $sort: { score: -1 } },
  ];

  const data = await db.get('repos').aggregate(pipeline);

  /* eslint-disable no-underscore-dangle */
  return data.map(item => item._id).indexOf(language) + 1;
};
