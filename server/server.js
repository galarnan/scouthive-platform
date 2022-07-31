const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const handleplayertable = require('./controllers/player');
const handleplayerdetails = require('./controllers/playerdetails');
const fetchURLdata = require('./controllers/transfermarkt');
const insertform = require('./controllers/addplayer');
const UsersList = require('./controllers/userlist');
const AddFriendRequest = require('./controllers/AddFriendRequest');
const PullFriendRequests = require('./controllers/PullFriendRequests');
const AcceptFriendRequests = require('./controllers/AcceptFriendRequest');
const CreateRequest = require('./controllers/createrequest');
const PullOthersPlayerRequests = require('./controllers/PullOthersPlayerRequests');
const MyPlayers = require('./controllers/MyFriends');
const MyPlayerRequests = require('./controllers/PullMyPlayerRequests');

const app = express();

app.use(cors());
app.use(express.json());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '1997',
    database: 'scouthive',
  },
});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/home', (req, res) => { handleplayertable.handleplayertable(req, res, db); });
app.post('/playerdetails', (req, res) => { handleplayerdetails.handleplayerdetails(req, res, db); });
app.post('/transfermarkt', (req, res) => { fetchURLdata.fetchURLdata(req, res); });
app.post('/addplayer', (req, res) => { insertform.handlePlayerAdd(req, res, db); });
app.post('/users', (req, res) => { UsersList.handleUsersList(req, res, db); });
app.post('/userspage_addfriend', (req, res) => { AddFriendRequest.handleFriendRequest(req, res, db); });
app.post('/userspage_getfriendrequests', (req, res) => { PullFriendRequests.handlePullFriendRequests(req, res, db); });
app.post('/userspage_acceptfriend', (req, res) => { AcceptFriendRequests.handleFriendRequestAccept(req, res, db); });
app.post('/createrequest', (req, res) => { CreateRequest.handleCreateRequest(req, res, db); });
app.post('/getplayerrequests', (req, res) => { PullOthersPlayerRequests.handlePullOthersPlayerRequests(req, res, db); });
app.post('/myplayers', (req, res) => { MyPlayers.handleMyFriends(req, res, db); });
app.post('/myplayerrequests', (req, res) => { MyPlayerRequests.handlePullMyPlayerRequests(req, res, db); });

app.listen(3000, () => {
  console.log('application is running on port 3000');
});
