const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const models = require('./models/models');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Node = models.Node;


const app = express();
const compiler = webpack(config);

const server = require('http').createServer(app);
const io = require('socket.io')(server)


const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

io.on('connection', socket => {
  console.log('client connected to socket');

  socket.on('newQuestion', (data) => {
    console.log('the server saw this')
    socket.broadcast.emit('newQuestionAdded', data)
    socket.emit('newQuestionAdded', data)
    // TODO: update the database
  })

  socket.on('upvote', (data)=>{
    console.log('received upvote from client');
    Node.findById(data.nodeId, function(err, node){
      node.upvotes = node.upvotes + 1;
      node.save()
      .then(function(newNode){
        socket.emit('upvote', newNode._id)
      })
      .catch(function(err){
        console.log('error', err);
      })
    })
  })

  socket.on('startingCoordinates', (data)=> {
    socket.broadcast.emit('startingCoordinates', data)
  })

  socket.on('Coordinates', (data)=> {
    socket.broadcast.emit('Coordinates', data)
  })

  socket.on('downvote', (data)=>{
    console.log('received downvote from client');
    Node.findById(data.nodeId, function(err, node){
      node.downvotes = node.downvotes + 1;
      node.save()
      .then(function(newNode){
        socket.emit('downvote', newNode._id)
      })
      .catch(function(err){
        console.log('error', err);
      })
    })
  })
})



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.post('/addQuestion', function(req, res) {
  Node.findById(req.body.nodeId, function(err, node){
    console.log(node);
    node.questions.push(req.body.questionObj);
    node.save()
    .then(function(newNode){
      console.log('savedClass', newNode);
    })
    .catch(function(err){
      console.log('error', err);
    })
  })
});

app.post('/downvote', function(req, res) {
  Node.findById(req.body.nodeId, function(err, node){
    console.log(node);
    node.upvotes = node.upvotes - 1;
    node.save()
    .then(function(newNode){
      console.log('savedClass', newNode);
    })
    .catch(function(err){
      console.log('error', err);
    })
  })
});

app.post('/getAllQuestions', function(req, res) {
  Node.find(function(err, allNodes){
    return res.send({allNodes: allNodes.reverse()});
  })
});

app.use('/', express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
