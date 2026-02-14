// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const Trip = require('./models/Trip');
const Category = require('./models/Category');
const { Op } = require("sequelize");

// Sessions
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// ============================
// 🔐 SESSION + COOKIE SUPPORT
// ============================
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24 
    }
  })
);

app.use((req, res, next) => {
  res.locals.destination = "";
  res.locals.category = "";
  res.locals.sort = "";
  res.locals.categories = [
    "Honeymoons",
    "Family Adventures",
    "Adventure Escapes",
    "Cultural Journeys",
    "Luxury Cruises",
    "Solo Expeditions"
  ];
  next();
});

// ============================
// Middleware
// ============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ============================
// Frontend routes
// ============================
app.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.render('index', { 
      title: 'TripMate | Home',
      trips
    });
  } catch (error) {
    console.error('❌ Error loading trips:', error);
    res.render('index', { 
      title: 'TripMate | Home',
      trips: []
    });
  }
});

app.get('/destinations', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.render('destinations', {
      title: 'TripMate | Destinations',
      trips
    });
  } catch (error) {
    console.error('❌ Error loading destinations:', error);
    res.status(500).send('Error loading destinations');
  }
});

app.get('/company', (req, res) =>
  res.render('company', { title: 'TripMate | About Our Company' })
);

app.get('/book', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    const selectedDestination = req.query.destination || null;
    const selectedCategory = req.query.category || null;

    res.render('book', {
      title: 'TripMate | Book with TripMate',
      trips,
      selectedDestination,
      selectedCategory
    });
  } catch (error) {
    console.error('❌ Error loading trips for booking:', error);
    res.render('book', {
      title: 'TripMate | Book with TripMate',
      trips: [],
      selectedDestination: null,
      selectedCategory: null
    });
  }
});

app.get('/signup', (req, res) =>
  res.render('signup', { title: 'TripMate | Sign Up' })
);

app.get('/login', (req, res) =>
  res.render('login', { title: 'TripMate | Login' })
);

// ✅ FIXED — correct URL + correct render name
app.get('/my-bookings', (req, res) => {
  res.render('myBookings', { title: 'TripMate | My Bookings' });
});

// SEARCH
app.get("/search", async (req, res) => {
  try {
    const category = (req.query.category || "").trim();
    const sort = req.query.sort || "alpha";
    const page = parseInt(req.query.page) || 1;

    const limit = 6;
    const offset = (page - 1) * limit;

    if (!category) return res.redirect("/categories");

    const where = { category };

    let order = [];
    if (sort === "alpha") order = [["destination", "ASC"]];
    else if (sort === "price_asc") order = [["price", "ASC"]];
    else if (sort === "price_desc") order = [["price", "DESC"]];

    const { rows: trips, count } = await Trip.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.render("search", {
      title: `TripMate | ${category} Trips`,
      trips,
      category,
      sort,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("Error loading search results");
  }
});

// ============================
// API routes
// ============================
const travelRoutes = require('./routes/travelRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

app.use('/categories', categoryRoutes);
app.use('/contact', contactRoutes);
app.use('/api/trips', travelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// ============================
// Database
// ============================
const sequelize = require('./config/db');
sequelize.sync()

  .then(() => console.log('✅ Database connected and synced successfully'))
  .catch(err => console.error('❌ Database connection error:', err));

// ============================
// Start server
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

module.exports = app;
