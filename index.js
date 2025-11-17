import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import cors from "cors";
import "dotenv/config";
import session from "express-session";

const app = express();

// Simple CORS setup that will work
app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


/*
const allowedOrigins = [
  'http://localhost:3000',
  'https://kambaz-next-fcygmx7du-harshithasaimaddukuris-projects.vercel.app',
  'https://kambaz-next.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Allow any vercel.app domain
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow specific origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow localhost for development
    if (origin.includes('localhost')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
*/

app.use(express.json());

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    httpOnly: true
  }
};

// Production session settings
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.sameSite = 'none';
}

app.use(session(sessionOptions));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Kambaz API Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// IMPORTANT: Use process.env.PORT for Render
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.CLIENT_URL) {
    console.log(`CLIENT_URL: ${process.env.CLIENT_URL}`);
  }
});