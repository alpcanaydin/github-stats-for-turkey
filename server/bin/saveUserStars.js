const monk = require('monk');

const config = require('../config.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');
const reposCollection = db.get('repos');

const main = async () => {
  let pipeline;
  if (process.argv.length >= 3) {
    pipeline = [
      { $match: { user: process.argv[2] } },
      {
        $group: {
          _id: '$user',
          stars: { $sum: '$stars' },
        },
      },
    ];
  } else {
    pipeline = { $group: { _id: '$user', stars: { $sum: '$stars' } } };
  }
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

  const query = { stars: { $exists: false } };
  const update = { $set: { stars: 0 } };
  const options = { multi: true };
  await usersCollection.update(query, update, options);
  db.close();
  console.log('All done!');
};

main();
