const router = require('express').Router();
const con = require('../app/database');

router.post('/create/:id?', function(req, res){
   
        con.query("SELECT * FROM product where ?", {
            id : req.params.id
        },
        function(err,productid) {
            con.query("insert into color set ?", {
                product_id : productid[0].id,
                color: req.body.colors,
            });
            res.redirect("/admincolor/read/" + productid[0].id);
            res.json(req.body)
        })

})

router.get('/read/:id?', function(req, res){
   
        con.query('select * from product where ?', {
            id : req.params.id,
        }, function (err, rows1) {
            con.query('select * from color where ?', {
                product_id : req.params.id,
            }, function (err, rows2){
                res.json(rows2)
            })
        }); 
    
})

router.get('/edit/:id?', function(req, res){
    
        // res.render("admin_edit_color", {id : req.params.id,sesi:sesi.admin_username});
        res.json(id)
    
})

router.post('/update/:id?', function(req, res){
    
        con.query("SELECT * FROM color where ?", {
            id : req.params.id
        },
        function(err,warnaproductid) {
            con.query("update color set ? where ?",
            [
                {
                    color: req.body.colors,
                },
                {
                    id : req.params.id,
                }
            ]);
            res.redirect("/admincolor/read/" + warnaproductid[0].product_id);
            res.json(req.body)
        })
    
})

router.get('/delete/:id?', function(req, res){
   
        con.query("SELECT * FROM color where ?", {
            id : req.params.id
        },
        function(err,warnaproductid) {
            con.query("delete from color where ?", {
                id : warnaproductid[0].id
            });
            res.redirect("/admincolor/read/" + warnaproductid[0].product_id);
        })    
    
})


module.exports = router;