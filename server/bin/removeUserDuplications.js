const monk = require('monk');

const config = require('../config.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');

const main = async () => {
  const $group = { $group: { _id: '$username', dups: { $sum: 1 } } };
  const $match = { $match: { dups: { $gt: 1 } } };

  const pipeline = [$group, $match];
  const response = await usersCollection.aggregate(pipeline);

  const bulkOperations = [];

  response.forEach(duplicate => {
    const deleteOne = {
      /* eslint-disable no-underscore-dangle */
      filter: { username: duplicate._id },
    };
    bulkOperations.push({ deleteOne });
  });

  await usersCollection.bulkWrite(bulkOperations);
  db.close();
  console.log('All done!');
};

main();
