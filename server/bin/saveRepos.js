const monk = require('monk');

const config = require('../config.json');
const repos = require('../output/repos.json');
const users = require('../output/users_detailed.json');

const db = monk(config.mongodb);

const reposCollection = db.get('repos');
reposCollection.ensureIndex('fullName');
reposCollection.ensureIndex('user');

const main = async () => {
  const promises = [];

  repos.forEach(repo => {
    // SHAME: Lessons learned! Plan your mapper carefully next time.
    const currentUser = users.find(user => repo.user === user.username);
    const data = Object.assign({}, repo, { city: currentUser.city });
    promises.push(reposCollection.insert(data));
    console.log(`${repo.fullName} added to queue`);
  });

  await Promise.all(promises);
  db.close();
  console.log('All done!');
};

main();
