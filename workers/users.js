let users = {};

function getUser(userId) {
  return users[userId];
}

function createUser(userId, initialBalance = 0) {
  if (users[userId]) return false;
  users[userId] = initialBalance;
  return true;
}

module.exports = { users, getUser, createUser };
