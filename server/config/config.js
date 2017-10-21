//This file holds any configuration variables we may need
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb://softwarewizards:CEN3031@ds119345.mlab.com:19345/deep_designs',
  },
  port: 3000
};
