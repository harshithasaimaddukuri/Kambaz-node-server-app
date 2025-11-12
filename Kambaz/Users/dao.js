export default function UsersDao(db) {
  let { users } = db;

  const findAllUsers = () => users;
  
  const findUserById = (userId) => 
    users.find(user => user._id === userId);
  
  const findUserByUsername = (username) => 
    users.find(user => user.username === username);
  
  const findUserByCredentials = (username, password) => 
    users.find(user => 
      user.username === username && user.password === password
    );

  const createUser = (user) => {
    const newUser = { ...user, _id: Date.now().toString() };
    users.push(newUser);
    return newUser;
  };

  const updateUser = (userId, userUpdates) => {
    const index = users.findIndex(user => user._id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...userUpdates, _id: userId };
      return users[index];
    }
    return null;
  };

  const deleteUser = (userId) => {
    const index = users.findIndex(user => user._id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    createUser,
    updateUser,
    deleteUser
  };
}
