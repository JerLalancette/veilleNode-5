const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs'); // générateur de template

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/ma_bd', (err, database) => {
    if (err) return console.log(err)
        db = database
        // lancement du serveur Express sur le port 8081
        app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081')
    })
})

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