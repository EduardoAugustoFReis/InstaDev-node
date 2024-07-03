const Sequelize = require("sequelize");
const Users = require("../app/models/Users");
const Posts = require("../app/models/Posts");

const models = [Users, Posts];
const databaseConfig = require("../configs/db");


class Database {
  constructor(){
    this.init();
  };

  init(){
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection))
  };

}

module.exports = new Database();