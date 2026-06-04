const express = require('express');

const router = express.Router();

const {
  getPosts,
  getPostById,
  createPost,
  publishPost,
} = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id/publish', publishPost);

module.exports = router;