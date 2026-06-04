const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    const formatted = users.map((u) => ({
      ...u,
      fullName: `${u.firstName} ${u.lastName}`,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        error: 'firstName, lastName and email are required',
      });
    }

    const existing = await userService.findUserByEmail(email);

    if (existing) {
      return res.status(409).json({
        error: 'Email already in use',
      });
    }

    const user = await userService.createUser({
      firstName,
      lastName,
      email,
      isActive: true,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deactivateUser(req.params.id);

    res.json({
      message: 'User deactivated',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
};