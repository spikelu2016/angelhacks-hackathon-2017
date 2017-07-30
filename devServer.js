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
  socket.on('newQuestion', (data) => {
    console.log('the server saw this')
    socket.broadcast.emit('newQuestionAdded', data)
    socket.emit('newQuestionAdded', data)
    // TODO: update the database
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

app.put('/saveAudioFiles', function(req, res) {
  console.log('hiiiiiiii', req.body.blob);
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
