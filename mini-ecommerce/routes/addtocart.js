const router = require('express').Router();
const con = require('../app/database');

// router.get('/test/query', function(req, res) { res.json(JSON.parse(req.query.test)) })

router.post('/', function(req, res){
        con.query("SELECT * FROM size where ?", {
            id : req.body.size
        }, function(err,rows1) {
            con.query("SELECT * FROM color where ?", {
                id : rows1[0].color_id
            }, function(err,rows2) {
                con.query("SELECT * FROM product where ?", {
                    id : rows2[0].product_id
                }, function(err,rows3) {
                    con.query("INSERT into chart set ?",
                    {
                        // user_id : req.session.user_id,
                        size_id : rows1[0].id,
                        product : rows3[0].product,
                        price : rows3[0].price,
                        color : rows2[0].color,
                        size : rows1[0].size,
                        quantity : req.body.qtybeli
                    })
                    // res.redirect("/cart");
                    res.json(req.body)
                })
            })
        })
})


module.exports = router;

