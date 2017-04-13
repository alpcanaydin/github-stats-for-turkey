const monk = require('monk');
const topLanguagesAgg = require('../aggs/location/topLanguages');
const config = require('../config.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');
const locationsCollection = db.get('locations');

const main = async () => {
  const username = process.argv[2];
  let user = await usersCollection.find({ username });
  user = user[0];
  let city = await locationsCollection.find({ location: user.city });
  city = city[0];
  const top = await topLanguagesAgg(db, user.city, 1);
  await locationsCollection.update(
    { location: user.city },
    {
      $set: {
        topLanguage: top[0].language,
        users: city.users + 1,
        repos: city.repos + user.publicRepos,
      },
    },
  );
  db.close();
};
main();
