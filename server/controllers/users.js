const User = require('../models').User;

const defaultRole = 2;

const UserController = {
  createUser: (req, res) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId || defaultRole
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },
  getUser: (req, res) => {
    User.findOne({ where: { id: req.params.id } }).then((user) => {
      res.status(200).json(user);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    });
  },
  getAllUsers: (req, res) => {
    User.findAll().then((user) => {
      res.status(200).json(user);
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    });
  },
  updateUser: (req, res) => {
    User.findById(req.params.todoId).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User Not Found',
        });
      }
      User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId || defaultRole
      }).then(() => {
        res.status(200).json(user);
      }).catch((err) => {
        res.status(404).json({ error: err.message });
      });
    }).catch((err) => {
      res.status(404).json({ error: err.message });
    });
  }
};
module.exports = UserController;
