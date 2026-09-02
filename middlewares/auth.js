import jwt from 'jsonwebtoken';

// verificando jwt

function verficarJwt(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'token nao fornecido!',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded;

    next()
  } catch (error) {
    return res.status(401).json({
      mensagem: 'token invalido!',
    });
  }
}

function verificarAdm(req, res, next) {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({
      mensagem: 'voce nao pode acessar essa pagina!',
    });
  }

  next();
}

function deleteUser(req, res) {
  const id = Number(req.params.id);

  let usuario = usuario.filter((u) => u.id !== id);

  res.json({
    mensagem: 'usuario excluido!',
  });
}

function editarUsers(req, res) {
  const id = Number(req.params.id);

  const { name, email, password } = req.body;

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      mensagem: 'usuario nao encontrado!',
    });
  }

  usuario.name = name;
  usuario.email = email;
  usuario.password = password;

  res.json({
    mensagem: 'usuario editado!',
    usuario: usuario,
  });
}

export default { verficarJwt, verificarAdm, deleteUser, editarUsers };
