const Sequelize = require("sequelize");
const Users = require("../app/models/Users");
const Posts = require("../app/models/Posts");

const models = [Users, Posts];
const databaseConfig = require("../configs/db");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => {
        console.log(`Inicializando modelo: ${model.name}`);
        return model.init(this.connection);
      })
      .map((model) => model.associate && model.associate(this.connection.models));

    console.log(this.connection.models);
  }
}

module.exports = new Database();
