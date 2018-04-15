const router = require('express').Router();
const con = require('../app/database');

router.get('/', function(req, res){
    // if (req.session.admin_username == null) {
    //     res.redirect("/admin")
    // } else {
        con.query("SELECT inv_code, total_price, time FROM invoice", function(err,invoicedata) {
            // res.render("admin_invoice_history", {
            //     data1 : rows1, 
            //     sesi: req.session.admin_username
            // })
            res.json(invoicedata);
        })
    // }
})

module.exports = router;