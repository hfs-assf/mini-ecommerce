const router = require('express').Router();
const con = require('../app/database');

router.get('/:id?', function(req, res){
    con.query('select * from categoryseason where ?', {
        id : req.params.id,
    }, function (err, rows1) {
        con.query('select * from product where ?', {
            categoryseason_id : req.params.id,
        }, function (err, product){
            res.json(product)
        })
    });
})


module.exports = router;