module.exports = async (db, user, limit = 50) =>
  db.get('repos').find({ user }, { limit, sort: { stars: -1 } });
