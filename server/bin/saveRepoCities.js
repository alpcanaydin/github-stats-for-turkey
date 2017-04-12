const monk = require('monk');

const config = require('../config.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');
const reposCollection = db.get('repos');

const main = async () => {
  let usersWithRepo

  if(process.argv.length >= 3){
    usersWithRepo = await usersCollection.find({ username:process.argv[2],publicRepos: { $gt: 0 } });
  }else{
    usersWithRepo = await usersCollection.find({ publicRepos: { $gt: 0 } });
  }

  const bulkOperations = [];

  usersWithRepo.forEach(user => {
    const updateMany = {
      filter: { user: user.username },
      update: { $set: { city: user.city } },
      upsert: false,
    };
    bulkOperations.push({ updateMany });
  });

  await reposCollection.bulkWrite(bulkOperations);
  const query = { stars: { $exists: false } };
  const update = { $set: { stars: 0 } };
  const options = { multi: true };
  await reposCollection.update(query, update, options);
  db.close();
  console.log('All done!');
};

main();
