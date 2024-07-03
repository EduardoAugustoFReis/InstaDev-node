const Posts = require("../models/Posts");

class PostsController{

  async create(request, response){
    const { image, description } = request.body;

    const newPost = await Posts.create({
      image, 
      description,
      author_id: request.userId,
    });

    console.log(newPost);

    return response.status(201).json({ post: newPost });
  }
}

module.exports = new PostsController;