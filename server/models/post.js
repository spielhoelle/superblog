var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Post', PostSchema);

