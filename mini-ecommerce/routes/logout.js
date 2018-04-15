const router = require('express').Router();
const con = require('../app/database');

router.get('/', function(req, res){
    req.session.destroy(function(err){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/home");
        }
    })
})


module.exports = router;