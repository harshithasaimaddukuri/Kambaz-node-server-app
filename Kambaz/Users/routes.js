import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  let currentUser = null;

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    currentUser = newUser;
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      currentUser = user;
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };

  const profile = (req, res) => {
    const user = req.session["currentUser"] || currentUser;
    if (!user) {
      res.sendStatus(401);
      return;
    }
    res.json(user);
  };

  const signout = (req, res) => {
    req.session.destroy();
    currentUser = null;
    res.sendStatus(200);
  };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const updatedUser = dao.updateUser(userId, req.body);
    if (req.session["currentUser"]?._id === userId) {
      req.session["currentUser"] = updatedUser;
      currentUser = updatedUser;
    }
    res.json(updatedUser);
  };

  const deleteUser = (req, res) => {
    const userId = req.params.userId;
    dao.deleteUser(userId);
    res.sendStatus(204);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const userId = req.params.userId;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
}
