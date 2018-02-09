const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs'); // générateur de template

app.get('/', (req, res) => {
    fs.readFile( __dirname + "/public/data/" + "membres.txt", 
        'utf8',
        (err, data) => {if (err) { return console.error(err);}
        console.log( data );
        let resultat = JSON.parse('[' + data + ']');           
        res.render('gabarit.ejs', {adresses: resultat})  
  });
})

const server = app.listen(8081, () => {
   let host = server.address().address
   let port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})