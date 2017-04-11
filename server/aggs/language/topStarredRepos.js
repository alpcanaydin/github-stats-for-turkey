module.exports = async (db, language, limit = 30) =>
  db.get('repos').find({ language }, { limit, sort: { stars: -1 } });
