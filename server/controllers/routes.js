const express = require('express');

const router = express.Router();
const knex = require('knex');

const handleplayertable = require('./player');
const handleplayerdetails = require('./playerdetails');
const fetchURLdata = require('./transfermarkt');
const insertform = require('./addplayer');
const UsersList = require('./userlist');
const AddFriendRequest = require('./AddFriendRequest');
const PullFriendRequests = require('./PullFriendRequests');
const AcceptFriendRequests = require('./AcceptFriendRequest');
const CreateRequest = require('./createrequest');
const PullOthersPlayerRequests = require('./PullOthersPlayerRequests');
const MyPlayers = require('./MyFriends');
const MyPlayerRequests = require('./PullMyPlayerRequests');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '1997',
    database: 'scouthive',
  },
});

router.post('/players', (req, res) => { handleplayertable.handleplayertable(req, res, db); });
router.post('/playerdetails', (req, res) => { handleplayerdetails.handleplayerdetails(req, res, db); });
router.post('/transfermarkt', (req, res) => { fetchURLdata.fetchURLdata(req, res); });
router.post('/addplayer', (req, res) => { insertform.handlePlayerAdd(req, res, db); });
router.post('/connections', (req, res) => { UsersList.handleUsersList(req, res, db); });
router.post('/userspage_addfriend', (req, res) => { AddFriendRequest.handleFriendRequest(req, res, db); });
router.post('/userspage_getfriendrequests', (req, res) => { PullFriendRequests.handlePullFriendRequests(req, res, db); });
router.post('/userspage_acceptfriend', (req, res) => { AcceptFriendRequests.handleFriendRequestAccept(req, res, db); });
router.post('/createrequest', (req, res) => { CreateRequest.handleCreateRequest(req, res, db); });
router.post('/getplayerrequests', (req, res) => { PullOthersPlayerRequests.handlePullOthersPlayerRequests(req, res, db); });
router.post('/myplayers', (req, res) => { MyPlayers.handleMyFriends(req, res, db); });
router.post('/myplayerrequests', (req, res) => { MyPlayerRequests.handlePullMyPlayerRequests(req, res, db); });

module.exports = router;
