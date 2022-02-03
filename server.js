var express = require("express")
var app = express()
var path = require("path")
const PORT = 3000;
var hbs = require('express-handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');
user_loged = false
usery = []

app.get("/", function (req, res) {
    res.render('index.hbs');
})

app.get("/login", function (req, res) {
    res.render('login.hbs');

})
app.post("/logged", function (req, res) {
    //console.log(req.body)
    //console.log(usery)
    //console.log(usery.length)
    for (i = 0; i < usery.length; i += 1) {
        if (usery[i].login == req.body.logged && usery[i].password == req.body.pswd) {
            res.redirect('/admin');
            user_loged = true
        } else {
            res.send('<script>alert("złe dane"); window.location.href = "/login"; </script>')
        }
    }
})
app.get("/register", function (req, res) {
    res.render('register.hbs');
})
app.post("/", function (req, res) {
    console.log(req.body)
    usery.push(req.body)
    res.render('index.hbs');
})

app.get("/admin", function (req, res) {
    if (user_loged == true) {
        res.render('admin.hbs');
        usery.sort(function (a, b) {
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        });
        app.get("/sort", function (req, res) {
            res.render("sort.hbs")
            
        })
    } else {
        res.render('adminerr.hbs');
    }
})
app.get("/logout", function (req, res) {
    user_loged = false
    res.redirect("./")
})
app.get("/show", function (req, res) {

})
//nasłuch
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
    console.log("hej");
})

app.use(express.static('static'))