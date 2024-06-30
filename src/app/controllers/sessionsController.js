const Users = require("../models/Users");
const yup = require("yup");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth");

class SessionController{

  async create(request, response){
    const schema = yup.object().shape({
      email: yup
      .string()
      .required("O email precisa ser informado"),
      password: yup
      .string()
      .required("A senha precisa ser informada"),
    })
    try {
      await schema.validate(request.body, {abortEarly: false});
      const { email, password } = request.body;

      const user = await Users.findOne({
        where: {
          email: request.body.email,
        } 
      })

      if(!user){
        return response.status(401).json({error: "Usuário não encontrado"});
      }

      if(!await user.checkPassword(password)){
        return response.json({error: "A senha não confer."})
      }

      const { id, name } = user;

      const token = jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })

      return response.status(200).json({user: {id, name} , token});

    } catch (error){
      if (error instanceof yup.ValidationError) {
        return response.status(400).json({ errors: error.errors });
      }
      console.log(error);
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

module.exports = new SessionController();