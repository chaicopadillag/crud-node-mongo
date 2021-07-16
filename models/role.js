const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, 'El campo nombre del rol es requirido'],
  },
});

module.exports = model('Role', RoleSchema);
