const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

class Users extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      user_name: Sequelize.STRING,
      email: Sequelize.STRING,
      avatar: Sequelize.STRING,
      bio: Sequelize.STRING,
      gender: Sequelize.STRING,
      password_hash: Sequelize.STRING,   
      password: Sequelize.VIRTUAL,
    },
    {
      sequelize,
    }
  );

  this.addHook("beforeSave", async (user) => {
    if(user.password){
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  })

  return this;
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash); // retorna booleano
  }
}

module.exports = Users;