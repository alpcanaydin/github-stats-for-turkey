module.exports = async (req, res) => {
  const locations = await req.db.get('locations').find({});
  res.json({ locations });
};
