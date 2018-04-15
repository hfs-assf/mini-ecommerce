const router = require('express').Router();
const con = require('../app/database');
const crypto = require('crypto');

let enkripsi = (password) => {
    return crypto
        .createHmac('sha256', 'abcdefg')
        .update(password)
        .digest('hex');
}

router.post('/', function(req, res) {
    let email = req.body.email;
    let password = enkripsi(req.body.password);
    con.query('select * from userdata where ? and ?', [{ email }, { password }], function(err, user) {
        if (user.length > 0) {
            req.session.userdata = {
                role: user[0].role,
                userid: user[0].id,
                name: user[0].name,
                email: user[0].email
            };
            req.session.save();
            res.send('Succes Login')
        } else {
            res.json(null)
        }
    })
})

router.post('/register', function(req, res){
    con.query('SELECT * FROM userdata WHERE email  = ?', [
        req.body.email
    ], 
    function (err, rows){
        if (rows.length > 0){
            res.render(__dirname + '/views/formregisteruser', 
            {
                notif:'Username sudah terdaftar !'
            });
        } else {
            con.query("insert into userdata set ? ", {
                role: 0,
                email : req.body.email,
                password : enkripsi(req.body.password),
                name : req.body.name
            });

            // res.redirect('/user/formlogin');
            res.json(req.body)
        }
    });
})

module.exports = router;