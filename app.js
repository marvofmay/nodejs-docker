const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const { initializeRedisClient } = require('./src/config/redis');
const initializePassport = require('./src/config/passport');
const ensureAuthenticated = require('./src/middleware/auth');

// Import routes
const basicRoutes = require('./src/routes/basicRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const photoRoutes = require('./src/routes/photoRoutes');
const manufacturerRoutes = require('./src/routes/manufacturerRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const logoutRoutes = require('./src/routes/logoutRoutes');
const errorRoutes = require('./src/routes/errorRoutes');

// express app
const app = express();

// Middleware & static files
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(express.static('node_modules'));
app.use(express.static('src/views'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    res.locals.path = req.path;
    console.log('xxxx', res.session);
    next();
});

const initializeApp = async () => {
    try {
        const dbURI = "mongodb://root:example@mongo:27017/?authSource=admin";
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const redisClient = await initializeRedisClient();
        if (! redisClient) {
            throw new Error('Failed to initialize Redis client');
        }
        const RedisStore = require('connect-redis')(session);

        console.log('Setting up session middleware...');
        app.set('trust proxy', 1);
        app.use(session({
            store: new RedisStore({ client: redisClient }),
            secret: 'your_secret_key',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: 1000 * 60 * 10 // session max age in milliseconds
            }
        }));

        initializePassport(passport);
        app.use(passport.initialize());
        app.use(passport.session());

        console.log('zzzzz', passport.session());

        app.set('views', 'src/views');
        app.set('view engine', 'ejs');

        // Routes
        app.use('/', basicRoutes);
        app.use('/login', loginRoutes);
        app.use('/categories', ensureAuthenticated, categoryRoutes);
        app.use('/products', ensureAuthenticated, productRoutes);
        app.use('/photos', ensureAuthenticated, photoRoutes);
        app.use('/manufacturers', ensureAuthenticated, manufacturerRoutes);
        app.use('/logout', ensureAuthenticated, logoutRoutes);
        app.use('/', errorRoutes);

        // Start the server
        app.listen(3000, () => {
            console.log('Server is running on port 3000...');
        });
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
};

// Initialize the app
initializeApp();
