const Posts = require("../models/Posts");

class PostsController{

  async create(request, response){
    const { image, description } = request.body;

    const newPost = await Posts.create({
      image, 
      description,
      author_id: request.userId,
    });

    if(!newPost){
      return response.status(400).json({message: "Created post failed."})
    }

    return response.status(201).json({ data: {image, description} });
  }

  async delete(request, response){
    const { id } = request.params
    
    const verifyPost = await Posts.findOne({
      where: {
        id: id,
      }
    })

    if(!verifyPost){
      return response.status(404).json({message: "Post does not exists."});
    }

    if(verifyPost.author_id != request.userId){
      return response.status(401).json(
        {message: "This post not belong you, you don't have permission to delete."}
      );
    }

    const deletedPost = await Posts.destroy({
      where: {
        id: id,
      }
    });

    if(!deletedPost){
      return response.status(400).json({message: "Failed to delete posts"});
    }

    return response.status(200).json({message: "Post deleted"});
  } 
}

module.exports = new PostsController;