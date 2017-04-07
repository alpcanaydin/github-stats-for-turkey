const monk = require('monk');

const config = require('../config.json');
const repos = require('../output/repos.json');

const db = monk(config.mongodb);

const reposCollection = db.get('repos');
reposCollection.ensureIndex('fullName');
reposCollection.ensureIndex('user');

const main = async () => {
  const promises = [];

  repos.forEach(repo => {
    promises.push(reposCollection.insert(repo));
    console.log(`${repo.fullName} added to queue`);
  });

  await Promise.all(promises);
  db.close();
  console.log('All done!');
};

main();
