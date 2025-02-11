const Users = require("../models/Users");
const yup = require("yup");
const bcrypt = require("bcryptjs");

class UserController{

  async create(request, response) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("O nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(50, "O nome deve ter no máximo 50 caracteres"),
      email: yup
        .string()
        .email("O email deve ser válido")
        .required("O email é obrigatório"),
      user_name: yup
        .string()
        .required("O user_name é obrigatório"),
      password: yup
        .string()
        .required("A senha é obrigatória")
        .min(6, "A senha deve conter no mínimo 6 caracteres"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { email, name, user_name, password } = request.body;

      const checkUserExists = await Users.findOne({
        where: {
          email: request.body.email,
        }
      });

      if (checkUserExists) {
        return response.status(400).json({ message: "Esse usuário já existe." });
      }

      let avatar = null;
      if (request.file) {
        avatar = request.file.filename;
      }

      const user = await Users.create({ 
        name, 
        user_name, 
        email, 
        password, 
        avatar 
      });

      return response.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          user_name: user.user_name,
          email: user.email,
          avatar: user.avatar,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        }
      });

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return response.status(400).json({ errors: error.errors });
      }
      console.log(error);
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  };


  async update(request, response){
      const { 
        name, 
        bio, 
        gender, 
        old_password, 
        new_password, 
        confirm_new_password,
      } = request.body;

      const { userId } = request;

      try {

        const user = await Users.findOne({
          where: {id: userId},
        });

        console.log(user);

        if(!user){
          return response.status(400).json({message: "Usuário não existe."});
        }

        let newPasswordHashed = "";
      
        if(old_password){
          if(!await user.checkPassword(old_password)){
            return response.status(401).json({error: "A senha antiga não confere."});
          }

          if(!new_password || !confirm_new_password){
            return response.status(401).json({error: "É preciso informar a nova senha e confrima-la."});
          }

          if(new_password !== confirm_new_password){
            return response.status(401).json({error: "A confirmação da senha não confere."});
          }

          newPasswordHashed = await bcrypt.hash(new_password, 8);
        } 

        let avatar = user.avatar;

        if(request.file){
          avatar = request.file.filename;
        }

        await Users.update(
          {
            name: name || user.name,
            avatar: avatar,
            bio: bio || user.bio,
            gender: gender || user.gender,
            password_hash: newPasswordHashed || user.password_hash,
          },
          {
            where: { id:user.id },
          }
      ) 

      return response.status(200).json({message: "Usuário atualizado."});
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }
  
  async delete(request, response){
    const { userId } = request;

    const user = await Users.findOne({
      where: {
        id: userId,
      }
    });

    if(!user){
    return response.status(400).json({message: "Usuário não encontrado."});
    }

    await user.destroy({
      where: {
        id: userId,
      }
    });

    return response.status(200).json({message: "Usuário deletado"});
  }

  async show(request, response){

    const { userId } = request;

    const user = await Users.findOne({
      attributes: ["id", "name", "user_name", "email", "avatar", "bio", "gender"],
      where: {
        id: userId,
      }
    })

    if(!user){
      return response.status(400).json({message: "Usuário não encontrado."});
    }

    return response.status(200).json({ user });
  } 
  
}

module.exports = new UserController();