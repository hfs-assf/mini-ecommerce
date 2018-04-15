const router = require('express').Router();
const con = require('../app/database');

// router.get('/test/query', function(req, res) { res.json(JSON.parse(req.query.test)) })

router.get('/:id?', function(req, res){
    con.query("SELECT * FROM color where ?",{
        product_id : req.params.id
    },
    function(err,warnaProduct) {
        if (req.query.warnaid === undefined) {
            con.query("SELECT * FROM product where ?", { 
                id: req.params.id 
            }, 
            function(err, product) {
                res.json({...product[0], warna: warnaProduct.map(el => el.warna)})
            })
        }
        else {
            con.query("SELECT id, size, stock FROM size where ?", {
                color_id : req.query.warnaid
            },
            function(err,sizeStockProduct) {
                res.json(sizeStockProduct)
            })
        }   
    })
})


module.exports = router;

