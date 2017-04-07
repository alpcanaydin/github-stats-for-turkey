const monk = require('monk');

const config = require('../config.json');
const users = require('../output/users_detailed.json');

const db = monk(config.mongodb);

const usersCollection = db.get('users');
usersCollection.ensureIndex('username');
usersCollection.ensureIndex('city');

const main = async () => {
  const promises = [];

  users.forEach(user => {
    console.log(`${user.username} added to queue`);
    promises.push(usersCollection.insert(user));
  });

  await Promise.all(promises);
  db.close();
  console.log('All done!');
};

main();
