module.exports = async (db, location, limit = 30) => {
  const query = Object.assign({}, location === 'turkey' ? {} : { city: location });
  return db.get('users').find(query, { limit, sort: { stars: -1 } });
};
