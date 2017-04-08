module.exports = async (db, location, limit = 50) => {
  const query = Object.assign({}, location === 'turkey' ? {} : { city: location });
  return db.get('repos').find(query, { limit, sort: { stars: -1 } });
};
