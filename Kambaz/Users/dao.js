import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const findAllUsers = () => {
    return model.find();
  };

  const findUserById = (userId) => {
    return model.findById(userId);
  };

  const findUserByUsername = (username) => {
    return model.findOne({ username: username });
  };

  const findUserByCredentials = (username, password) => {
    return model.findOne({ username, password });
  };

  const findUsersByRole = (role) => {
    return model.find({ role: role });
  };

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ],
    });
  };

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  };

  const updateUser = (userId, userUpdates) => {
    return model.updateOne({ _id: userId }, { $set: userUpdates });
  };

  const deleteUser = (userId) => {
    return model.findByIdAndDelete(userId);
  };

  return {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    createUser,
    updateUser,
    deleteUser,
  };
}