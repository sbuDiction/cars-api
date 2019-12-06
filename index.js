const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
let brandList = []
// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 4010;

app.post('/api/brand_add', (req, res) => {
    let brand = req.body.brandName
    brandList.push(brand)
    res.json({
        status: 'success'
    })
})

app.get('/api/brand_list', (req, res) => {
    res.json(brandList)
})

app.listen(PORT, function () {
    console.log('started on: ', this.address().port);
});