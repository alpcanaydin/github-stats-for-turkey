module.exports = async (db, language) => db.get('repos').count({ language });
