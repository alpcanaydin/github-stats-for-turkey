const GithubApi = require('github');
const cityNormalizer = require('../lib/cityNormalizer');

const config = require('../config.json');

class Github {
  constructor(options) {
    this.options = options;

    this.tokens = [...config.tokens];
    this.currentToken = -1;

    this.create();
  }

  pickToken() {
    if (this.currentToken === this.tokens.length - 1) {
      this.currentToken = 0;
    } else {
      this.currentToken = this.currentToken + 1;
    }

    return this.tokens[this.currentToken];
  }

  create() {
    this.github = new GithubApi(this.options);

    const token = this.pickToken();
    console.log(`Picked a token. ${token}`);

    this.github.authenticate({
      type: 'oauth',
      token,
    });
  }

  searchUsers(query) {
    return new Promise(resolve => {
      const output = [];

      const search = (page = 1) => {
        console.log(`Page ${page} is fetching ${query}`);

        const params = {
          q: query,
          page,
        };

        this.github.search.users(params, (err, response) => {
          console.log(`Page ${page} fetched for ${query}`);

          if (err) {
            this.create();
            search(page);
            return;
          }

          const users = response.data.items.map(user => ({
            username: user.login,
            id: user.id,
            city: cityNormalizer(query),
            url: user.url,
          }));
          output.push(...users);

          if (this.github.hasNextPage(response)) {
            search(page + 1);
          } else {
            console.log(`All pages fetched for ${query}`);
            resolve(output);
          }
        });
      };

      search(1);
    });
  }

  getUser(user) {
    const username = user.username;

    return new Promise(resolve => {
      const fetch = () => {
        this.github.users.getForUser({ username }, (err, response) => {
          if (err) {
            if (err.code === 404) {
              console.log(`${username} skipped.`);
              resolve(null);
              return;
            }

            console.log(err.message);
            this.create();
            fetch();
            return;
          }

          console.log(`Details fetched for ${username}`);
          resolve(Object.assign({}, response.data, { city: user.city }));
        });
      };

      fetch();
    });
  }

  getRepos(username) {
    return new Promise(resolve => {
      const output = [];

      const fetch = (page = 1) => {
        this.github.repos.getForUser({ username, page }, (err, response) => {
          console.log(`Page ${page} is fetching ${username}`);

          if (err) {
            if (err.code === 404) {
              console.log(`${username} skipped.`);
              resolve(null);
              return;
            }

            console.log(err.message);
            this.create();
            fetch();
            return;
          }

          const data = response.data.filter(repo => !repo.fork);
          output.push(...data);

          if (this.github.hasNextPage(response)) {
            fetch(page + 1);
          } else {
            console.log(`All pages fetched for ${username}`);
            resolve(output);
          }
        });
      };

      fetch(1);
    });
  }
}

module.exports = Github;
