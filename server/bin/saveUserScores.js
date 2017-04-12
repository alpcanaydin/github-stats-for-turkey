const monk = require('monk');

const config = require('../config.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');

const main = async () => {
  let users
  if(process.argv.length >= 3){
    users = await usersCollection.find({username:process.argv[2]});
  }else{
    users = await usersCollection.find({});
  }

  const promises = [];

  users.forEach(user => {
    const update = { $set: { score: user.followers + user.stars } };
    promises.push(usersCollection.update({ username: user.username }, update));
  });

  console.log('Started to save...');
  await Promise.all(promises);

  db.close();
  console.log('All done!');
};

main();
