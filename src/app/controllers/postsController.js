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

  async update(request, response){
    const { image, description} = request.body;
    const { id } = request.params;

    const verifyPost = await Posts.findOne({
      where: {
        id: id,
      }
    });

    if(!verifyPost){
      return response.status(404).json({message: "Post not exists."});
    }

    if(verifyPost.author_id != request.userId){
      return response.status(401).json(
        {message: "This post does not belong you, you don't have permission to delete"}
      );
    }

    const postUpdated = await Posts.update({
      image,
      description,
    },
    {
      where: { id: id }
    }
  );
    
    if(!postUpdated){
      return response.status(400).json({message: "Failed to update posts"});
    }

    return response.status(200).json({message: "Post update"});
  }

  async addLike(request, response){
    const { id } = request.params;

    const verifyPost = await Posts.findOne({
      where: {
        id: id,
      }
    })

    if(!verifyPost){
      return response.status(404).json({message: "Post not exists."});
    }

    const updatePost = await Posts.update(
    {
      number_likes: verifyPost.number_likes + 1
    }, 
    {
      where: { id }, 
    });

    if(!updatePost){
      return response.status(400).json({message: "Failed to add like in this post."});
    }

    return response.status(200).json({ message: "Like storage." });
  }
}

module.exports = new PostsController;