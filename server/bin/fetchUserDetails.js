const fs = require('fs');

const Github = require('../lib/githubApi');
const userMapper = require('../lib/userMapper');

const users = require('../output/users.json');

const options = {
  headers: {
    'user-agent': 'Github-Stats-For-Turkey',
  },
};

const github = new Github(options);

const main = async () => {
  const output = [];

  /* eslint-disable */
  for (const user of users) {
    const raw = await github.getUser(user);
    if (raw) {
      const data = userMapper(raw);
      output.push(data);
    }
  }
  /* eslint-enable */

  const file = `${__dirname}/../output/users_detailed.json`;
  fs.writeFile(file, JSON.stringify(output, null, 2), err => {
    if (err) {
      console.log('An error occured while saving users data.');
      return;
    }

    console.log('All done!');
  });
};

main();
