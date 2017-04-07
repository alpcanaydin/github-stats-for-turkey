const userMapper = data => ({
  username: data.login,
  githubId: data.id,
  avatarUrl: data.avatar_url,
  name: data.name,
  company: data.company,
  location: data.location,
  city: data.city,
  email: data.email,
  bio: data.bio,
  followers: data.followers,
  following: data.following,
  publicRepos: data.public_repos,
  privateRepos: data.total_private_repos,
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
});

module.exports = userMapper;
