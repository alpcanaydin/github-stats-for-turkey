const monk = require('monk');

const config = require('../config.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');
const reposCollection = db.get('repos');

const main = async () => {
  const pipeline = { $group: { _id: '$user', stars: { $sum: '$stars' } } };
  const response = await reposCollection.aggregate(pipeline);

  const bulkOperations = [];

  response.forEach(userStar => {
    const updateOne = {
      /* eslint-disable no-underscore-dangle */
      filter: { username: userStar._id },
      /* eslint-enable */
      update: { $set: { stars: userStar.stars } },
      upsert: false,
    };
    bulkOperations.push({ updateOne });
  });

  await usersCollection.bulkWrite(bulkOperations);
  db.close();
  console.log('All done!');
};

main();
