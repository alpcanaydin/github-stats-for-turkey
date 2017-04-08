const monk = require('monk');
const cityNormalizer = require('../lib/cityNormalizer');
const topLanguagesAgg = require('../aggs/location/topLanguages');

const config = require('../config.json');
const cities = require('../data/cities.json');

const db = monk(config.mongodb);
const usersCollection = db.get('users');
const reposCollection = db.get('repos');
const locationsCollection = db.get('locations');

const main = async () => {
  const cityReducer = (prev, cur) => {
    const normalized = cityNormalizer(`location:${cur}`);

    if (prev.indexOf(normalized) === -1) {
      return [...prev, normalized];
    }

    return prev;
  };

  const uniqueCities = cities.reduce(cityReducer, []);

  const locationPromises = [];

  uniqueCities.forEach(city => {
    const dataPromises = [
      city,
      topLanguagesAgg(db, city, 1),
      usersCollection.count({ city }),
      reposCollection.count({ city }),
    ];

    locationPromises.push(Promise.all(dataPromises));
  });

  const turkey = Promise.all([
    'turkey',
    topLanguagesAgg(db, 'turkey', 1),
    usersCollection.count(),
    reposCollection.count(),
  ]);
  locationPromises.push(turkey);

  const output = await Promise.all(locationPromises);
  const data = output.map(cityData => ({
    location: cityData[0],
    topLanguage: cityData[1].length > 0 ? cityData[1][0].language : null,
    users: cityData[2],
    repos: cityData[3],
  }));

  await locationsCollection.insert(data);
  db.close();
  console.log('All done!');
};

main();
