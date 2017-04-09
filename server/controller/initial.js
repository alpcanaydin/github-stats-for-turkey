const topRankedUsersAgg = require('../aggs/location/topRankedUsers');

module.exports = async (req, res) => {
  const locations = await req.db.get('locations').find({});
  const turkey = locations.find(location => location.location === 'turkey');

  const users = await topRankedUsersAgg(req.db, 'turkey', 10);
  res.json({ locations, turkey, users });
};
