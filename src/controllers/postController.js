const Post = require("../models/Post");

// controladores para tags
const assignTags = async (req, res) => {
  try {
    const post = req.post;

    const { tagsIds } = req.body;

    post.tags = tagsIds;

    await post.save();

    res.status(200).json({
      message: "Tags asignados al post correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al asignar tags en el post",
      error: error.message,
    });
  }
};

const associateTag = async (req, res) => {
  try {
    const post = req.post;

    const { tagId } = req.params;

    post.tags.addToSet(tagId);

    await post.save();

    res.status(200).json({
      message: "Tag asociado al post correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al asociar el tag en el post",
      error: error.message,
    });
  }
};

const dissociateTag = async (req, res) => {
  try {
    const post = req.post;

    const { tagId } = req.params;

    post.tags.pull(tagId);
    await post.save();

    res.status(200).json({
      message: "Tag desasociado del post correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al desasociar el tag del post",
      error: error.message,
    });
  }
};

//Contorladores para post
const createPost = async (req, res) => {
  try {
    const { description, user, images, tags } = req.body;

    const post = await Post.create({
      description,
      user,
      images,
      tags,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "nickname email") // Protege contraseña
      .populate("tags", "name");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = req.post;

    await post.populate("user", "nickname email");
    await post.populate("tags", "name");

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user")
      .populate("tags");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//image
//ADD IMAGE
const addImage = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || url.trim() === "") {
      return res
        .status(400)
        .json({ message: "La URL de la imagen es obligatoria." });
    }

    const post = req.post;

    post.images.push({ url });

    await post.save();

    res.status(200).json({
      message: "Imagen agregada al post con éxito.",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar la imagen al post",
      error: error.message,
    });
  }
};

//REMOVE IMAGE
const removeImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const post = req.post;

    const image = post.images.id(imageId);
    
    if (!image) {
      return res.status(404).json({ message: "La imagen no fue encontrada en este post." });
    }

    image.deleteOne();
    
    await post.save();

    res.status(200).json({
      message: "Imagen eliminada con éxito.",
      data: post
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar la imagen", 
      error: error.message 
    });
  }
};

module.exports = {
  assignTags,
  associateTag,
  dissociateTag,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addImage,
  removeImage
};
