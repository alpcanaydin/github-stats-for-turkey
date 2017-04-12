const fs = require('fs');
const Github = require('../lib/githubApi');
const createUserSearchQueries = require('../lib/createUserSearchQueries');

const options = {
  headers: {
    'user-agent': 'Github-Stats-For-Turkey',
  },
};

const github = new Github(options);

const main = async () => {
  console.log('User fetching is started.');

  const queries = createUserSearchQueries();
  const promises = [];
  queries.forEach(query => promises.push(github.searchUsers(query)));
  const users = await Promise.all(promises);
  const response = users.reduce((prev, cur) => [...prev, ...cur], []);

  fs.writeFile(`${__dirname}/../output/users.json`, JSON.stringify(response, null, 2), err => {
    if (err) {
      console.log('An error occured while saving users data.');
      return;
    }

    console.log('All done!');
  });
};

main();
