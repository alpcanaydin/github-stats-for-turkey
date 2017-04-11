module.exports = async (db, location, minYear, maxYear) => {
  const cityQuery = location === 'turkey' ? {} : { city: location };

  const minYearQuery = minYear ? { $gte: new Date(minYear, 1, 1).toISOString() } : {};
  const maxYearQuery = maxYear ? { $lt: new Date(maxYear, 1, 1).toISOString() } : {};
  const rangeQuery = {
    createdAt: Object.assign({}, minYearQuery, maxYearQuery),
  };

  const query = Object.assign({}, cityQuery, rangeQuery);

  return db.get('repos').count(query);
};
