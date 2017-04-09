module.exports = async (db, location, rule) => {
  if (location === 'turkey') {
    return 1;
  }

  const pipeline = [
    { $group: { _id: '$city', score: { $sum: `$${rule}` } } },
    { $sort: { score: -1 } },
  ];

  const data = await db.get('users').aggregate(pipeline);

  /* eslint-disable no-underscore-dangle */
  return data.map(item => item._id).indexOf(location) + 1;
};
