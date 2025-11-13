import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import Lab5 from "./Lab5/index.js";

const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "https://kambaz-next-js-chi.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
};

app.use(cors(corsOptions));

// Session configuration for cross-origin
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: true, // Changed to true
  proxy: true, // Added for Render
  cookie: {
    secure: true, // Always true for production
    sameSite: "none", // Required for cross-site cookies
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
};

app.use(session(sessionOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Full Stack Development!");
});

UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
Lab5(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});