const { Router } = require("express");
const router = Router();

const {
  assignTags,
  associateTag,
  dissociateTag,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addImage,
  removeImage,
} = require("../controllers/postController");

const {
  validatePostExists,
  validatePostBody,
} = require("../middlewares/postMiddleware");

const { validateTagId } = require("../middlewares/tagMiddleware");

//rutas para posts
router.post("/", validatePostBody, createPost);
router.get("/", getPosts);
router.get("/:id", validatePostExists, getPostById);
router.put("/:id", validatePostExists, validatePostBody, updatePost);
router.delete("/:id", validatePostExists, deletePost);

// rutas para tags
router.post("/:id/tags", validatePostExists, assignTags);

router.post(
  "/:id/tags/:tagId",
  validatePostExists,
  validateTagId,
  associateTag,
);

router.delete(
  "/:id/tags/:tagId",
  validatePostExists,
  validateTagId,
  dissociateTag,
);

//ruta para image

router.post("/:id/images", validatePostExists, addImage);
router.delete("/:id/images/:imageId", validatePostExists, removeImage);


module.exports = router;
