const { Sequelize } = require('sequelize'),
  config = require('../configuration'),
  path = require('path'),
  fs = require('fs'),
  basename = path.basename(__filename);
const db = {};

const modelsDir = path.normalize(`${__dirname}/../models`);

const sequelize = new Sequelize(config.getConfig().database, config.getConfig().user, config.getConfig().password, {
  host: config.getConfig().host,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

fs.readdirSync(modelsDir)
  .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
  // import model files and save model names
  .forEach((file) => {
    console.info(`Loading model file ${file}`);
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize);
    db[model.name] = model;
  });



Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

// db.accounts_token.belongsTo(db.accounts,{foreignKey: 'user_id', targetKey: 'id'});
// db.accounts.hasMany(db.accounts_token,{foreignKey: 'id', targetKey: 'user_id'});