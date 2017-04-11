module.exports = async (db, language) => {
  const pipeline = [
    { $match: { language } },
    { $group: { _id: '$user' } },
    { $group: { _id: 1, count: { $sum: 1 } } },
  ];
  const users = await db.get('repos').aggregate(pipeline);

  return users.length ? users[0].count : 0;
};
