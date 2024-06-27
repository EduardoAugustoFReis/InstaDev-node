const Users = require("../models/Users");

class UserController{

  async create(request, response){
    try {
      const { email, name, user_name, password_hash} = request.body;

      const checkUserExists = await Users.findOne({
        where:{
          email: request.body.email,
        }
      })
  
      if(checkUserExists){
        return response.status(400).json({message: "Esse usuário já existe."});
      }
  
      const user = await Users.create({ name, user_name, email, password_hash});
  
      return response.status(201).json({ user });

    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
   
  };
}

module.exports = new UserController();