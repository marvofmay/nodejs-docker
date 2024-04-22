const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const photoRoutes = require('./src/routes/photoRoutes');
const manufacturerRoutes = require('./src/routes/manufacturerRoutes');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

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

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://marcinjaroszynskigdansk:0FGVSoC1l8vsrtRf@clusternodejs.2hfsqth.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// set path to views folder
app.set('views', 'src/views');
// register view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' })
});

app.get('/info', (req, res) => {
  res.render('info', { title: 'Info' });
});

// categories routes
app.use('/categories', categoryRoutes);
// products routes
app.use('/products', productRoutes);
// photos routes
app.use('/photos', photoRoutes);
// manufacturer routes
app.use('/manufacturers', manufacturerRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404error', { title: '404' });
});