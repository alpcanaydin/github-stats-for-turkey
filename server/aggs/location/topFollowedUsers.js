module.exports = async (db, location, limit = 50) => {
  const query = Object.assign({}, location === 'turkey' ? {} : { city: location });
  return db.get('users').find(query, { limit, sort: { followers: -1 } });
};
