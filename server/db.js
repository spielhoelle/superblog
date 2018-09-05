require('dotenv').config({path: __dirname + '/../.env'});

module.exports = {
  'url' : process.env.MONGOURL || 'mongodb://localhost/posts'
}

