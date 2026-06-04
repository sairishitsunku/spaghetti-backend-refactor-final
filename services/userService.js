const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllUsers = () => {
  return prisma.user.findMany({
    where: { isActive: true },
    include: { posts: true },
  });
};

const getUserById = (id) => {
  return prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { posts: true },
  });
};

const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const createUser = (data) => {
  return prisma.user.create({
    data,
  });
};

const deactivateUser = (id) => {
  return prisma.user.update({
    where: { id: parseInt(id) },
    data: { isActive: false },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  findUserByEmail,
  createUser,
  deactivateUser,
};