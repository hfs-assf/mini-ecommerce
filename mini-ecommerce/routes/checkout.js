const router = require('express').Router();
const con = require('../app/database');

// router.get('/test/query', function(req, res) { res.json(JSON.parse(req.query.test)) })

router.post('/', function(req, res){
    var kode_invoice = "INV" + req.session.user_id + (new Date).getMonth() + (new Date).getHours() + (new Date).getSeconds();

    // if (req.session.user_nama == null) {
    //     res.redirect("/user_login")
    // }
    // else {
        con.query("SELECT * FROM cart where ?", {
            // user_id : req.session.user_id
        },
        function(err,cart) {
            con.query("INSERT into invoice set ?", {
                userdata_id : cart[0].userdata_id,
                inv_code : inv_code,
                total_price : req.body.grand_total,
                name : req.body.nama_penerima,
                address : req.body.alamat_penerima,
                phone : req.body.telp_penerima,
                time : new Date
            })
            
            cart.forEach(x => {
                con.query("INSERT into invoicedetail set ?", {
                    inv_code: inv_code_id,
                    product_name: x.nama,
                    color : x.warna,
                    size : x.size,
                    quantity : x.qty,
                    price : x.harga
                })
                con.query("SELECT stock from size where ?", {
                    id : x.size_id
                },
                function(err,sizeandstockProduct_id) {
                    con.query("UPDATE size SET ? where ?",
                    [
                        {
                            stock : sizeandstockProduct_id[0].stock - x.quantity
                        },
                        {
                            id : x.size_id
                        }
                    ])
                })

            })    

            con.query("DELETE FROM chart where ?", {
                // user_id : req.session.user_id
            })
            // res.redirect("/invoice/" + kode_invoice);
        }) 
    // }
})


module.exports = router;

