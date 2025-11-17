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

// CORS configuration that works for both local and production
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',  
      'http://localhost:3001',  
    ];

    // In production, allow Vercel domains
    const vercelPatterns = [
      /^https:\/\/kambaz-next\.vercel\.app$/,  
      /^https:\/\/kambaz-next-.*\.vercel\.app$/,  
      /^https:\/\/kambaz-next-.*-harshithasaimaddukuris-projects\.vercel\.app$/  
    ];
    
    // Also add the specific URL you provided
    const specificAllowedUrls = [
      'https://kambaz-next-fcygmx7du-harshithasaimaddukuris-projects.vercel.app'
    ];

    console.log("Incoming request from origin:", origin);

    // Allow requests with no origin (Postman, server-to-server, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Check if origin is in specific allowed URLs
    if (specificAllowedUrls.includes(origin)) {
      return callback(null, true);
    }

    // Check if origin matches any Vercel pattern
    const isVercelOrigin = vercelPatterns.some(pattern => pattern.test(origin));
    if (isVercelOrigin) {
      return callback(null, true);
    }

    // If CLIENT_URL is set in environment, allow it
    if (process.env.CLIENT_URL) {
      const cleanUrl = process.env.CLIENT_URL.trim().replace(/['"]/g, '');
      if (origin === cleanUrl) {
        return callback(null, true);
      }
    }

    // Log blocked origins for debugging
    console.log("Warning: Blocked origin:", origin);
    
    if (origin.includes('vercel.app')) {
      console.log("Allowing Vercel domain:", origin);
      return callback(null, true);
    }
    
    return callback(null, true);  
    
    // For strict CORS (production)
    // callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    httpOnly: true
  }
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); 
  sessionOptions.cookie = {
    ...sessionOptions.cookie,
    secure: true,  
    sameSite: 'none'  
  };
}

app.use(session(sessionOptions));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Kambaz API Server is running',
    cors: 'enabled',
    origin: req.headers.origin || 'no origin',
    environment: process.env.NODE_ENV || 'development'
  });
});

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.CLIENT_URL) {
    console.log(` CLIENT_URL: ${process.env.CLIENT_URL}`);
  }
});