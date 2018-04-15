const router = require('express').Router();
const con = require('../app/database');

// router.get('/test/query', function(req, res) { res.json(JSON.parse(req.query.test)) })

router.get('/', function(req, res){
    // if (req.session.user_nama == null){
    //     // res.redirect("/user_login")
    // }
    // else{
        con.query('SELECT * FROM chart where ?',{
            // user_id : req.session.user_id
            userlogin_id : req.params.id
        }, function(err,cart) {
            res.json(cart)
        })
    // }
})

// USER CART EDIT____________________________________________

router.get('/edit/:id?', function(req, res){
    // if (req.session.user_nama == null){
    //     res.redirect("/user_login")
    // }
    // else {
        res.json(id)
    // }
})

router.post('/update/:id?', function(req, res){
    con.query("update chart set ? where ?",
        [
            {
                quantity : req.body.quantity
            },
            {
                id : req.params.id,
            }
        ]);
        // res.redirect("/cart");
        res.json(req.body)
})

// USER CART DELETE____________________________________________

router.get('/delete/:id?', function(req, res){
    // if (req.session.user_nama == null) {
    //     res.redirect("/user_login")
    // } else {
        con.query("delete from chart where ?",
        {
            id: req.params.id
        });
        // res.redirect("/cart");
    // }
})

module.exports = router;

