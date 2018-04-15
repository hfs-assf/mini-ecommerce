var mysql = require("mysql");
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({ extended: false })

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

var uniqid = require('uniqid');
const  fileUpload = require('express-fileupload');
app.use(fileUpload())

const crypto = require('crypto');
const secret = 'abcdefg';

var conn = mysql.createConnection
(
    {
      host: "localhost",
      port: '8889',
      database: "cs",
      user:"root",
      password:"root",

    }
)


app.get('/',function(req,res){
	res.render('adminlogin',{
		notif:''
	});
});

//========================================================================================================//
//Login Admin

app.get('/login',function(req,res){
	res.render('adminlogin',{
		notif:''
	});
});

app.post('/login',url,function(req,res){

  // console.log(req.body)

  const password = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');
  
  // console.log(password)
	var sql = 'SELECT * FROM adminlogin WHERE username = ? and password = ?';
	conn.query(sql, [req.body.username, password], function (err, rows){
		if (rows.length > 0){
			sess=req.session;
			sess.id = rows[0].id;
			sess.username = rows[0].username;

			res.redirect('/admin');
		}
		else
		{
      res.render('adminlogin',
      {
				notif:'Username atau password salah!!!'
			});
		}
	});
	
});


//SignUp Admin

app.get('/register',function(req,res){
	res.render('adminsignup');
	
});

app.post('/registeradmin',url,function(req,res){

	//console.log(req.body);

	var sql = 'SELECT * FROM adminlogin WHERE username = ?';
  	conn.query(sql, [req.body.username], function (err, rows) {
		if (rows.length > 0 )
		{
			res.render('adminlogin', 
        {
            notif:'Username sudah terdaftar !'
        });

		}
		else
    {
    const password = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');

    // console.log(password);

    conn.query("insert into adminlogin set ? ",
    {
        username : req.body.username,
        password : password,
    });

    conn.query("insert into admindata set ? ",
    {
        name : req.body.name,
        email : req.body.email,
    });

    res.redirect('/');
    }
	});
	
});

app.get('/logout',function(req,res)
{
	req.session.destroy(function(err) 
	{
		if(err) 
		{
				console.log(err);
		} 
		else {
			res.redirect('/login');
		}
	});
});


/////// admin ///////

app.get('/admin',url, function(req, res)
{
  sess =req.session;

  // console.log(sess)
  if(sess.id==null)
  {
    res.redirect('/login')
  }
  else
  {
    conn.query("select * from season",function(err,rows,field)
    {
      conn.query("select categoryseason.id,season.nameseason, categoryseason.category_name from categoryseason left join season on categoryseason.season_id = season.id",function(err,rows2)
      {
        conn.query('select product.id,nameseason,category_name,product,description,price from product left join categoryseason on product.categoryseason_id = categoryseason.id left join season on season.id =categoryseason.season_id',function(err,rows3)
        {
          conn.query('select color.id, product, color from product left join color on product.id = color.product_id',function(err,rows4)
          {
            conn.query('select size.id, product, stock, size from product left join color on product.id = color.product_id  left join size on color.id = size.color_id',function(err,rows5)
            {
              conn.query('select size.id, nameseason,category_name,product,color,size,stock from product left join categoryseason on categoryseason.id = product.categoryseason_id left join season on season.id = categoryseason.season_id left join color on product.id = color.product_id left join size on color.id = size.color_id',function(err,rows6){
                res.render('dashboard',
                {x:rows,
                 y:rows2,
                 z:rows3,
                 colours:rows4,
                 sized:rows5,
                 all:rows6,
                 username : sess.username
                })
                // res.json({rows,rows2,rows3});
                // res.json(rows);
              })
            })
          }) 
        })
        
      })
    })
  }
})

//========================================================================================================//
//save season
app.post('/save-season', url ,function(req, res)
{
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query("insert into season set ?", 
    {
      nameseason : req.body.seasons,
    })
    res.redirect('/admin')
  }
})

//edit season
app.get('/update-season/:id',function (req,res)
{
  sess = req.session;
  // console.log(sess)
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query('select * from season where id =?', [req.params.id], function(err,rows,field) {
      res.render('editseasons',
      {
       season :rows ,
       id : req.params.id,
       username : sess.username,
      })
      // console.log(rows)
    })
  }
})

app.post('/edit-season/:id', url , function (req,res) {
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query("update season set ? where ?" , 
    [
        {
            nameseason : req.body.nameseasons
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/admin')
  }
  
})


//delete season
app.get('/delete-season/:id',url,function (req,res){
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query('delete from season where ?', {
      id:req.params.id
    })
    res.redirect('/admin')
  }
})

//========================================================================================================//

// category season

app.post('/save-cs', url, function (req,res)
 {
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else{
    conn.query('insert into categoryseason set ? ', 
    {
      category_name : req.body.category_names,
      season_id : req.body.seasons
    })
    res.redirect('/admin')
  }
})

app.get('/update-category/:id',function (req,res)
{
  sess = req.session;
  // console.log(sess)
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query('select * from categoryseason where id = ?', [req.params.id], function(err,rows,field) {
      res.render('editcategory',
      {
       kategori :rows ,
       id : req.params.id,
       username : sess.username,
      })
      // console.log(rows)
    })
  }
})

app.post('/edit-category/:id', url , function (req,res) {
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query("update categoryseason set ? where ?" , 
    [
        {
            category_name : req.body.category_names
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/admin')
  }
  
})


//delete category seasons
app.get('/delete-cs/:id',url,function (req,res)
 {
  sess = req.session;
    if (sess.id==null)
    {
        res.redirect('/login');
    }
    else{
      conn.query('delete from categoryseason where ?' , {
        id : req.params.id
      })
      res.redirect('/admin')
    }
})



//========================================================================================================//

//Input Product
app.post('/save-product', url , function (req,res) {
  // console.log(req.body);
  // res.end();
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else{
    var file = req.files.uploaded_image;
    var nameFile = uniqid() + '.' +  req.files.uploaded_image.mimetype.split('/')[1];
    console.log(nameFile)

    file.mv(__dirname+'/images/' + nameFile, function (err){
      conn.query('insert into product set ? ' , {
        categoryseason_id : req.body.category_names,
        product : req.body.name_products,
        description : req.body.descriptions,
        price : req.body.prices,
        image : nameFile
      })
    })
    res.redirect('/admin')
  }
})

// edit product
app.get('/update-product/:id',function (req,res)
{
  sess = req.session;
  // console.log(sess)
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query('select * from product where product.id = ?', [req.params.id], function(err,rows,field) {
      res.render('editproduct',
      {
       product :rows ,
       id : req.params.id,
       username : sess.username,
      })
      // console.log(rows)
    })
  }
})

app.post('/update-product/:id', url, function (req,res)
{
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query("update product set ? where ?" ,
    [
        {
            product : req.body.products,
            description : req.body.descriptions,
            price : req.body.prices
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/admin')
  }
    
})

//delete product
app.get('/delete-product/:id',url,function (req,res)
 {
  sess = req.session;
    if (sess.id==null)
    {
        res.redirect('/login');
    }
    else{
      conn.query('delete from product where ?' , {
        id : req.params.id
      })
      res.redirect('/admin')
    }
})

//========================================================================================================//

//Input Color
app.post('/save-color', url , function (req,res) {
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    // res.json(req.body)
    conn.query('insert into color set ? ' , {
      product_id : parseInt(req.body.product_ids),
      color : req.body.colors
    })
    res.redirect('/admin')
  }
  
})

//edit-color

app.get('/update-color/:id',function (req,res) 
{
  
  sess = req.session;
  // console.log(sess)
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query('select * from color where id = ? ', [req.params.id], function(err,val2) 
    {
      res.render('editcolor', 
      {
       warna :val2,
       id : req.params.id,
       username : sess.username,
      })
    })
  }
})

app.post('/edit-color/:id', url , function (req,res) {
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query("update color set ? where ?" , 
    [
        {
            color : req.body.colors
        },
        {
            id : req.params.id
        }
    ])
    res.redirect('/admin')
  }
  
})

//delete color
app.get('/delete-color/:id',url,function (req,res)
 {
  sess = req.session;
    if (sess.id==null)
    {
        res.redirect('/login');
    }
    else{
      conn.query('delete from color where ?' , {
        id : req.params.id
      })
      res.redirect('/admin')
    }
})

//========================================================================================================//
//Input stock
app.post('/save-stock', url , function (req,res) {
  sess = req.session;
    if (sess.id==null){
      res.redirect('/login');
    }
    else
    {
      conn.query('insert into size set ? ' , {
        color_id : req.body.color_ids,
        size : req.body.sizes,
        stock : req.body.stocks,
    })
    res.redirect('/admin')
    }
  
})

//edit-size

app.get('/update-stock/:id',function (req,res) 
{
  
  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query('select * from size where id = ? ', [req.params.id], function(err,rows) 
    {
      res.render('editsize', 
      {
       stock :rows,
       id : req.params.id,
       username : sess.username,
      })
    })
  }
})

app.post('/edit-stock/:id', url,function (req,res) {

  sess = req.session;
  if (sess.id==null)
  {
    res.redirect('/login');
  }
  else
  {
    conn.query("update size set ? where ?" , 
    [
      {
          size : req.body.sizes ,
          stock : parseInt(req.body.now) + parseInt(req.body.update)
      },
      {
          id : req.params.id
      }
    ])
    res.redirect('/admin')
  }

  
})

//delete size//

app.get('/delete-size/:id',url,function (req,res)
 {
  sess = req.session;
    if (sess.id==null)
    {
        res.redirect('/login');
    }
    else{
      conn.query('delete from size where ?' , {
        id : req.params.id
      })
      res.redirect('/admin')
    }
})

//========================================================================================================//

/////// user ///////

app.get('/index',url,function(req,res){
  
    conn.query('select * from season', function (err,rows,field){
        res.render('public/index',{
          x:rows,
          // username : sess.username,
          })
        // console.log(rows);
    })
})


//========================================================================================================//
//User

app.get('/category/:id',function(req,res){
  conn.query('select season.id, categoryseason.id, season.nameseason, categoryseason.category_name from categoryseason left join season on categoryseason.season_id = season.id where season.id = ?', [req.params.id], function (err,rows,field){
      res.render('public/category',
      {
        x:rows ,
        
    })
  })
})

app.get('/product/:id', function(req,res){
  conn.query('select categoryseason.id, product.id ,category_name, product, price from product left join categoryseason on product.categoryseason_id = categoryseason.id left join season on season.id =categoryseason.season_id where categoryseason.id = ? ',[req.params.id], function(err,rows5,field){
      res.render('public/product',
      {
      data:rows5 ,
       
    })
  })
})










      



app.listen(3005);