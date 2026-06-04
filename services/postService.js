const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllPosts = () => {
  return prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
};

const getPostById = (id) => {
  return prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });
};

const createPost = (data) => {
  return prisma.post.create({
    data,
  });
};

const publishPost = (id) => {
  return prisma.post.update({
    where: { id: parseInt(id) },
    data: { published: true },
  });
};

const getAuthor = (authorId) => {
  return prisma.user.findUnique({
    where: { id: authorId },
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  publishPost,
  getAuthor,
};