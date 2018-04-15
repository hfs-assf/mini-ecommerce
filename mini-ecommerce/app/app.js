var express = require('express');
var app = express();

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use (cors());


// var uniqid = require('uniqid');
// const  fileUpload = require('express-fileupload');
// app.use(fileUpload())

// const crypto = require('crypto');
// const secret = 'abcdefg';

var cors = require('cors');
app.use(cors());

var login = require('../routes/login');
app.use('/login', login);

app.use('/*', function(req, res, next) {
  if (req.session.userdata.role === 1) {
  
      // ADMIN SEASON____________________________________________
      var adminSeason = require('../routes/adminseason')
      app.use('/adminseason', adminSeason)

      // ADMIN KATEGORI____________________________________________
      var adminCategory = require('../routes/admincategory')
      app.use('/admincategory', adminCategory)

      // ADMIN PRODUCT____________________________________________
      var adminProduct = require('../routes/adminproduct')
      app.use('/adminproduct', adminProduct)

      // ADMIN WARNA____________________________________________
      var adminColor = require('../routes/admincolor')
      app.use('/admincolor', adminColor)

      // ADMIN SIZE AND STOCK____________________________________________
      var adminSizeAndStock = require('../routes/adminsizeandstock')
      app.use('/adminsizeandstock', adminSizeAndStock)

      // ADMIN RESULT____________________________________________
      var adminResult= require('../routes/adminresult')
      app.use('/adminresult', adminResult)

      // ADMIN HISTORY INVOICE____________________________________________
      var adminHistoryInvoice= require('../routes/adminhistoryinvoice')
      app.use('/adminhistoryinvoice', adminHistoryInvoice)

  }
  next();
})


// home
var home = require('../routes/home')
app.use('/home',home)

// category
var category = require('../routes/category')
app.use('/category',category)

// product
var product = require('../routes/product')
app.use('/product',product)

// detail
var detail = require('../routes/detail')
app.use('/detail',detail)

// addToCart
var addToCart = require('../routes/addtocart')
app.use('/addtocart',addToCart)

// cart
var cart = require('../routes/cart')
app.use('/cart',cart)

// checkout
var checkout = require('../routes/checkout')
app.use('/checkout',checkout)

// invoice
var invoice = require('../routes/invoice')
app.use('/invoice',invoice)

// history invoice
var histroryInvoice = require('../routes/histroryinvoice')
app.use('/histroryinvoice',histroryInvoice)

//log out
var logout = require('../routes/logout')
app.use('/logout',logout)



app.listen(3004);