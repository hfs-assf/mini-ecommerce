const router = require('express').Router();
const con = require('../app/database');

router.post('/create/:id?', function(req, res){
        con.query("SELECT id,nameseason from season where ?", {
            id : req.params.id
        },
        function(err,seasonid) {
            con.query("insert into categoryseason set ?", {
                season_id : seasonid[0].id,
                categoryname: req.body.categorynames,
            });
            res.redirect("/admincategory/read/" + seasonid[0].id);
            res.json(req.body)
        })
})

router.get('/read/:id?', function(req, res){
            con.query('select id, category_name from categoryseason where ?', {
                season_id : req.params.id,
            }, function(err,rows2) {
                res.json(rows2) 
            });
})

router.get('/edit/:id?', function(req, res){
        // res.render("admin_edit_kategori", {id : req.params.id,sesi:sesi.admin_username});
        res.json(id)
})

router.post('/update/:id?', function(req, res){
        con.query("SELECT * FROM categoryseason where ?", {
            id : req.params.id
        },
        function(err,kategoriid) {
            con.query("update categoryseason set ? where ?",
            [
                {
                    categoryname : req.body.categorynames,
                },
                {
                    id : req.params.id,
                }
            ]);
            res.redirect("/admincategory/read/" + kategoriid[0].season_id);
            res.json(req.body)
        })
})

router.get('/delete/:id?', function(req, res){
        con.query("SELECT * FROM categoryseason where ?", {
            id : req.params.id
        },
        function(err,kategoriid) {
            con.query("DELETE FROM categoryseason where ?", {
                id: kategoriid[0].id
            });
            res.redirect("/admincategory/read/" + kategoriid[0].season_id);
        })    
})

module.exports = router;
