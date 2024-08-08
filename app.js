const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { initializeRedisClient } = require('./src/config/redis');
const initializePassport = require('./src/config/passport');
const { ensureAuthenticated } = require('./src/middleware/auth');
const connectDB = require('./src/config/mongodb');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const dotenv = require('dotenv');

// Import routes
const basicRoutes = require('./src/routes/basicRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const photoRoutes = require('./src/routes/photoRoutes');
const manufacturerRoutes = require('./src/routes/manufacturerRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const logoutRoutes = require('./src/routes/logoutRoutes');
const errorRoutes = require('./src/routes/errorRoutes');

// api endpoints
const sessionEndpointsApiV1 = require('./src/routes/api/v1/session/sessionEndpoints');
const categoryEndpointsApiV1 = require('./src/routes/api/v1/category/categoryEndpoints');
const productEndpointsApiV1 = require('./src/routes/api/v1/product/productEndpoints');
const manufacturerEndpointsApiV1 = require('./src/routes/api/v1/manufacturer/manufacturerEndpoints');

// express app
const app = express();

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware & static files
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(express.static('node_modules'));
app.use(express.static('src/views'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const initializeApp = async () => {
    try {
        await connectDB();
        const redisClient = await initializeRedisClient();
        if (! redisClient) {
            throw new Error('Failed to initialize Redis client');
        }

        const RedisStore = require('connect-redis')(session);
        app.use(session({
            store: new RedisStore({ client: redisClient }),
            secret: 'your_secret_key',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: 1000 * 60 * 60
            }
        }));

        initializePassport(passport);
        app.use(passport.initialize());
        app.use(passport.session());
        app.use((req, res, next) => {
            res.locals.user = req.isAuthenticated() ? req.user : null;
            next();
        });
        app.use((req, res, next) => {
            res.locals.path = req.path;
            next();
        });

        app.set('views', 'src/views');
        app.set('view engine', 'ejs');

        // Routes
        app.use('/', basicRoutes);
        app.use('/login', loginRoutes);
        app.use('/api/v1/sessions', sessionEndpointsApiV1);
        app.use('/api/v1/categories', categoryEndpointsApiV1);
        app.use('/api/v1/products', productEndpointsApiV1);
        app.use('/api/v1/manufacturers', manufacturerEndpointsApiV1);
        app.use('/categories', ensureAuthenticated, categoryRoutes);
        app.use('/products', ensureAuthenticated, productRoutes);
        app.use('/photos', ensureAuthenticated, photoRoutes);
        app.use('/manufacturers', ensureAuthenticated, manufacturerRoutes);
        app.use('/logout', ensureAuthenticated, logoutRoutes);
        app.use('/', errorRoutes);

        return app;
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
};

module.exports = initializeApp;

if (require.main === module) {
    initializeApp().then(app => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} ...`);
        });
    });
}

