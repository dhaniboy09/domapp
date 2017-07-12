const Role = require('../models').Role;

const RoleController = {
	createRole: (req, res) => {
    Role.create({
      roleName: req.body.roleName
    })
      .then((role) => {
        res.status(201).json(role);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },
  getAllRoles(req, res) {
    return Role
      .findAll()
      .then(role => res.status(200).json(role))
      .catch(error => res.json(error));
  },
  findRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(400).json({
            message: 'Role not found'
          });
        } 
      res.status(200).json(role);
        
      }).catch(error => res.status(400).json(error));
  },
  deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(400).json({
            message: 'Role not found'
          });
        }
        return role
            .destroy()
            .then(() => res.status(200).json({ message: 'Role has been deleted successfully' }))
            .catch(error => res.status(400).send(error));
      }).catch(error => res.json(error));
  },
  updateRole(req, res) {
    if (req.decoded.roleId !== 1) {
      return res.status(401).json({ message: 'You are not authorized access the role' });
    }
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(400).json({
            message: 'Role not found'
          });
        }
        return role
          .update({
            title: req.body.title || role.title
          })
          .then(() => res.status(200).json({
            message: 'Role updated successfully',
            role
          }))
          .catch(error => res.status(400).json(error));
      }).catch(error => res.status(400).json(error));
  }
}
module.exports = RoleController;
