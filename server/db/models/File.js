const Sequelize = require('sequelize')
const db = require('../db')

const File = db.define('file', {
  key: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      unique: true,
    }
  }
})

module.exports = File;
