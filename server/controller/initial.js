module.exports = async (req, res) => {
  const locations = await req.db.get('locations').find({});
  const turkey = locations.find(location => location.location === 'turkey');
  res.json({ locations, turkey });
};
