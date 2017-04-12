const fs = require('fs');
const Github = require('../lib/githubApi');
const createUserSearchQueries = require('../lib/createUserSearchQueries');
const cityNormalizer = require('../lib/cityNormalizer');
const repoMapper = require('../lib/repoMapper');
const monk = require('monk');
const config = require('../config.json');
const db = monk(config.mongodb);
const userMapper = require('../lib/userMapper');
const usersCollection = db.get('users');
const reposCollection = db.get('repos');

usersCollection.ensureIndex('username');
usersCollection.ensureIndex('city');
reposCollection.ensureIndex('fullName');
reposCollection.ensureIndex('user');

let username = null
if(process.argv.length < 3){
  console.log('Username not entered!')
  console.log('Using: node bin/fetchUser.js username!')
  process.exit()
}
username = process.argv[2]

const options = {
  headers: {
    'user-agent': 'Github-Stats-For-Turkey',
  },
};

const github = new Github(options);

const main = async () => {
  console.log('User fetching is started.');

  const queries = createUserSearchQueries();
  const pro = github.getUser({ username: username })
  let user = await Promise.all([pro]);
  if(!user[0]){
    console.log('User not found!')
    process.exit()
  }
  user = user[0]
  user.city = cityNormalizer(user.location)
  user_detail = user
  user = {
    username: user.login,
    id: user.id,
    city: user.city,
    url: user.url,
  }

  const raw = await github.getRepos(user.username)
  const repos = raw.map(repoMapper);
  addNewUser(user, user_detail, repos)
};

main();

const addNewUser = async (user, user_detail, repos) => {
  const data = await usersCollection.find({ username: user.username })
  
  if(data.length != 0){
    console.log('user exists!')
    process.exit()
  }

  const promises = []
  user_detail = userMapper(user_detail)
  const userData = Object.assign({}, user_detail, { username: user_detail.username.toLowerCase() });
  promises.push(appendToJsonFile(user, `${__dirname}/../output/users.json`))
  promises.push(appendToJsonFile(user_detail, `${__dirname}/../output/users_detailed.json`))
  promises.push(appendToJsonFile(repos, `${__dirname}/../output/repos.json`))
  promises.push(usersCollection.insert(userData))
  promises.push(reposCollection.insert(repos))
  await Promise.all(promises)
  console.log('User added!')
}

const appendToJsonFile = (obj, file_url) => {

  return new Promise(resolve => {
    const append = () => {
      fs.readFile(file_url,function(err,content){
      let data = JSON.parse(content)
      data.push(obj)
      fs.writeFile(file_url,JSON.stringify(data),function(err){
        if(err) throw err;
      })
    })
    }
    append();
  })
}
