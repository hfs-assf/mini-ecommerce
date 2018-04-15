const router = require('express').Router();
const con = require('../app/database');

router.get('/:id?', function(req, res){
    // if (req.session.user_nama == null){
    //     // res.redirect("/user_login")
    // }
    // else{
    con.query("SELECT ssprd.id,nameseason,category_name,dateInput,product,price,image,description,color,size,stock FROM season se JOIN categoryseason ktg on se.id = ktg.season_id join product prd on ktg.id = prd.categoryseason_id JOIN color wrnprd on prd.id = wrnprd.product_id JOIN size ssprd on wrnprd.id = ssprd.color_id where ssprd.id = ?",[req.params.id], function (err, result) {
        res.json(result)
    }); 
    // }
})


module.exports = router;