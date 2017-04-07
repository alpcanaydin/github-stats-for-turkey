const userMapper = data => ({
  name: data.name,
  fullName: data.full_name,
  user: data.owner.login,
  description: data.description,
  stars: data.stargazers_count,
  watchers: data.watchers_count,
  forks: data.forks_count,
  language: data.language,
  size: data.size,
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
  pushedAt: new Date(data.pushed_at),
});

module.exports = userMapper;
