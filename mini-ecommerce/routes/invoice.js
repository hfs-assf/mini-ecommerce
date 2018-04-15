const router = require('express').Router();
const con = require('../app/database');

router.get('/:id?', function(req, res){
    // if (req.session.user_nama == null) {
    //     res.redirect("/user_login")
    // }
    // else {
        con.query("SELECT * FROM invoice where ?", {
            inv_code : req.params.id
        },
        function(err,rows1) {
            con.query("SELECT * FROM invoicedetail where ?", {
                inv_code : req.params.id
            },
            function(err,kodeinvoice) {
                res.json(kodeinvoice)
                // res.render("user_invoice",{data1 : rows1, data2: rows2, sesi: req.session.user_nama})
            })
        })
    // }
})


module.exports = router;