import PostsService from "../services/posts.service.js";
import postsValidation from "../utils/posts.validation.js";

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }

  getPost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await this.postsService.getPost(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error fetching post" });
    }
  };

  getPosts = async (req, res) => {
    try {
      const posts = await this.postsService.getPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error fetching posts" });
    }
  };

  getPostsByUser = async (req, res) => {
    try {
      const posts = await this.postsService.getPostsByUser(req.user.id);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error fetching posts" });
    }
  };

  postPost = async (req, res) => {
    try {
      const newPost = req.body;

      if (!newPost) {
        return res.status(400).json({ error: "Post data is required" });
      }

      const validation = postsValidation.schema.validate(newPost);

      if (validation.error) {
        return res.status(400).json({ error: "Post has invalid fields" });
      }

      const createdPost = await this.postsService.postPost(
        req.user.id,
        newPost
      );

      res.status(201).json(createdPost);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error creating post" });
    }
  };

  patchPost = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPost = req.body;

      if (!updatedPost) {
        return res.status(400).json({ error: "Post data is required" });
      }

      const validation = postsValidation.optionalSchema.validate(updatedPost);

      if (validation.error) {
        return res.status(400).json({ error: "Post has invalid fields" });
      }

      const result = await this.postsService.patchPost(id, updatedPost);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error updating post" });
    }
  };

  putPost = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPost = req.body;

      if (!updatedPost) {
        return res.status(400).json({ error: "Post data is required" });
      }

      const validation = postsValidation.schema.validate(updatedPost);

      if (validation.error) {
        return res
          .status(400)
          .json({ error: "Post has invalid or missing fields" });
      }

      const result = await this.postsService.putPost(id, updatedPost);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Error updating/put post" });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.postsService.deletePost(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error deleting post" });
    }
  };
}

export default PostsController;
