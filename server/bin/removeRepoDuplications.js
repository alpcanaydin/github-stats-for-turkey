const monk = require('monk');

const config = require('../config.json');

const db = monk(config.mongodb);
const reposCollection = db.get('repos');

const main = async () => {
  const $group = { $group: { _id: '$fullName', dups: { $sum: 1 } } };
  const $match = { $match: { dups: { $gt: 1 } } };

  const pipeline = [$group, $match];
  const response = await reposCollection.aggregate(pipeline);

  const bulkOperations = [];

  response.forEach(duplicate => {
    const deleteOne = {
      /* eslint-disable no-underscore-dangle */
      filter: { fullName: duplicate._id },
    };
    bulkOperations.push({ deleteOne });
  });

  await reposCollection.bulkWrite(bulkOperations);
  db.close();
  console.log('All done!');
};

main();
