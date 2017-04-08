module.exports = async (db, location, rule, score) => {
  const locationQuery = location === 'turkey' ? {} : { city: location };
  const scoreQuery = { [rule]: { $gte: score } };
  const query = Object.assign({}, locationQuery, scoreQuery);
  return db.get('users').count(query);
};
