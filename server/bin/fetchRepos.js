const fs = require('fs');

const Github = require('../lib/githubApi');
const repoMapper = require('../lib/repoMapper');

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
    const raw = await github.getRepos(user.username);
    if (raw) {
      const data = raw.map(repoMapper);
      output.push(...data);
    }
  }
  /* eslint-enable */

  const file = `${__dirname}/../output/repos.json`;
  fs.writeFile(file, JSON.stringify(output, null, 2), err => {
    if (err) {
      console.log('An error occured while saving repos data.');
      return;
    }

    console.log('All done!');
  });
};

main();
