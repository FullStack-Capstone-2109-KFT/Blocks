//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const File = require('./models/File');

//associations could go here!
File.belongsTo(User)
User.hasMany(File)

module.exports = {
  db,
  models: {
    User,
    File
  },
}
