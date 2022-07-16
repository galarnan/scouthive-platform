const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const handleplayertable = require('./controllers/player');
const handleplayerdetails = require('./controllers/playerdetails');
const fetchURLdata = require('./controllers/transfermarkt')
const insertform = require('./controllers/addplayer')

const app = express();

app.use(cors());
app.use(express.json());

//playing around

// async function fetchdata() {
//   const response = await fetch('https://www.transfermarkt.com/lionel-messi/profil/spieler/28003');
//   const body = await response.text();
//   const $ = await cheerio.load(body);
//   console.log($)

//   const items = []
//   $(".info-table > .info-table__content--bold").map((i,el) =>{
//     item = $(el).text().trim()
//     items.push(item)

//   })
//   console.log(items)
// }

// fetchdata()






const db = knex({
    // connect to your own database here:
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1997',
      database : 'scouthive'
    }
  });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/home', (req,res) =>{handleplayertable.handleplayertable(req,res,db) });
app.post('/playerdetails', (req,res) =>{handleplayerdetails.handleplayerdetails(req,res,db) });
app.post('/transfermarkt', (req,res) =>{fetchURLdata.fetchURLdata(req,res) });
app.post('/addplayer', (req,res) =>{insertform.handlePlayerAdd(req,res,db) });

app.listen(3000, ()=> {
    console.log('application is running on port 3000');
  })