const router = require('express').Router();
const con = require('../app/database');

router.get('/', function(req, res){
    // if (req.session.user_nama == null){
    //     res.redirect("/user_login")
    // }
    // else {
        con.query("SELECT inv_code, total_price, time FROM invoice where ?", {
            userdata_id : req.session.userdata_id
        },
        function(err,rows) {
            // res.render("user_invoice_history", {data1 : rows1, sesi: req.session.user_nama})
            res.json(rows)
        })
    // }
})


module.exports = router;