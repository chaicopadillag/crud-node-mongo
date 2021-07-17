const esAdminRole = (req, res, next) => {
  if (!req.authUser) {
    return res.status(401).json({ message: 'Error al verificar user admin, sin token' });
  }

  const { role, name } = req.authUser;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      message: `el usuario ${name} no es admin, para eliminar`,
    });
  }

  next();
};

const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.authUser.role)) {
      return res.status(401).json({
        message: 'No tiene permiso para realizar esta acción',
      });
    }
    next();
  };
};

module.exports = { esAdminRole, verificarRol };
