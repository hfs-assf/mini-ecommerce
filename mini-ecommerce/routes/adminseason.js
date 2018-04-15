const router = require('express').Router();
const con = require('../app/database');

router.post('/create', function(req, res){
    con.query("insert into season set ? ", {
        nameseason : req.body.seasons
    })
    res.json(req.body)
    // res.redirect("/adminseason/read");
    
})

router.get('/read', function(req, res){
    con.query("select * from season", function(err,season,field){
        // res.render(__dirname + '/views/webadmin', {
        //         data:rows
        res.json(season)
    })
})


router.get('/edit/:id?', function(req, res){
    
    // res.render("admin_edit_season", {id : req.params.id,sesi:sesi.admin_username});
    res.json(id)
})

router.post('/update/:id?', function(req, res){
    con.query("update season set ? where ?",
    [
        {
            nameseason : req.body.seasons
        },
        {
            id : req.params.id,
        }
    ]);
    res.redirect("/adminseason/read");
    res.json(req.body)
})

router.get('/delete/:id?', function(req, res){
    con.query("delete from season where ?", {
        id: req.params.id
    });
    res.redirect("/adminseason/read");
})

// create read update delete









module.exports = router;