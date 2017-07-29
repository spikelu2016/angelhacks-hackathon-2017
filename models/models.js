const mongoose = require('mongoose');
mongoose.connect('mongodb://spike:1@ds137207.mlab.com:37207/google_docs');


const nodeSchema = mongoose.Schema({
      description: String,
      type: String,
      upvotes: Number,
      downvotes: Number,
      questions: [
        {
          question: String,
          username: String,
          topic: String
        }
      ]
});

var Node = mongoose.model('Node', nodeSchema);

module.exports = {
  Node: Node
};
