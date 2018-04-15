const router = require('express').Router();
const con = require('../app/database');

router.get('/:id?', function(req, res){
    con.query('SELECT * from season where ?', {
        id : req.params.id,
    }, function (err, rows1) {
        con.query('select * from categoryseason where ?', {
            season_id : req.params.id
        }, function (err, kategori){
            res.json(kategori)
        })
    });
})

module.exports = router;