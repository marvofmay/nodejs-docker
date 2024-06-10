const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const basicRoutes = require('./src/routes/basicRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const photoRoutes = require('./src/routes/photoRoutes');
const manufacturerRoutes = require('./src/routes/manufacturerRoutes');
const errorRoutes = require('./src/routes/errorRoutes');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

// express app
const app = express();

// middleware & static files
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(express.static('node_modules'));
app.use(express.static('src/views'));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

const initializeRedisClient = async () => {
    try {
        const client = redis.createClient({
            url: 'redis://redis:6379',
            legacyMode: true
        });
        client.on('error', (err) => {
            console.error('Could not establish a connection with redis. ' + err);
        });
        client.on('connect', () => {
            console.log('Connected to redis successfully');
        });
        await client.connect();

        return client;
    } catch (error) {
        console.error('Failed to initialize Redis client:', error);
    }
};

const initializeApp = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const dbURI = "mongodb://root:example@mongo:27017/?authSource=admin";
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB...');

        const redisClient = await initializeRedisClient();

        if (!redisClient) {
            throw new Error('Failed to initialize Redis client');
        }

        const RedisStore = connectRedis(session);

        console.log('Setting up session middleware...');
        app.use(session({
            store: new RedisStore({ client: redisClient }),
            secret: 'secret$%^134',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: 1000 * 60 * 10
            }
        }));

        // set path to views folder
        app.set('views', 'src/views');
        // register view engine
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());

        // routes start
        app.use('/', basicRoutes);
        app.use('/categories', categoryRoutes);
        app.use('/products', productRoutes);
        app.use('/photos', photoRoutes);
        app.use('/manufacturers', manufacturerRoutes);
        app.use('/', errorRoutes);
        // routes end

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
