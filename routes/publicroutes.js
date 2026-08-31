import dotenv from 'dotenv';

dotenv.config({
    path: '../../.env'
});
import validarCadastro from '../middlewares/validacao.js';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import bcrypt from 'bcrypt'
import {
    verficarJwt,
    verificarAdm,
    deleteUser,
    editarUsers
} from '../middlewares/auth.js';

const router = Router();

// banco de dados em memoria com array

let usuarios = [
  {
    id: 1,
    name: 'nathan',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin'
  }
];

console.log(usuarios)

// rota para criar o usuario

router.post('/cadastro', validarCadastro, async (req, res) => {
  const { name, email, password } = req.body;

  const passwordCorretctly = await bcrypt.hash(password, 10);

  const usuario = {
    id: usuarios.length + 1,
    name: name,
    email: email,
    password: passwordCorretctly,
    role: 'user'
  }

  usuarios.push(usuario);

  res.status(201).json({
    mensagem: 'usuario cadastrado com sucesso!'
});
});

// rota para fazer a autenticaçao do usuario, e criar o jwt

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const usuario = usuarios.find((u) => u.email === email);

  // fazendo a autenticaçao -- 'quem e voçe?'

  if (!usuario) {
    return res.status(404).json({
      mensagem: 'usuario nao encontrado',
    });
  }
  const senhaCorreta = await bcrypt.compare(password, usuario.password);

  if (!senhaCorreta) {
    return res.status(401).json({
      mensagem: 'senha ou email incorretos!',
    });
  }

  // criando o jwt, se a autenticaçao for correta

  const token = jwt.sign(
    { id: usuario.id }, 
    process.env.JWT_SECRET, 
    {
    expiresIn: '1h',
  });

  // devolvendo o token para o front-end

  res.json({
    mensagem: 'login realizado com sucesso!',
    token: token,
    role: usuario.role
  });
});

// rota do painel admin

router.post('/admin/:id', verficarJwt,  (req, res) => {
  const id = Number(req.params.id);

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      mensagem: 'usuario nao encontrado(a)'
    });
  }
  if (usuario.role !== 'admin') {
    return res.status(403).json({
      mensagem: 'voce nao pode acessar o painel admin!'
    });
  }
  res.json({
    mensagem: 'voce acessou o painel admin!',
    role: usuario.role
  });
});

router.get('/usuarios', verficarJwt, verificarAdm, (req, res) => {
  res.json(usuarios);
});

router.put('/usuarios/:id', verficarJwt, verificarAdm, editarUsers,);

router.delete('/usuarios/:id', verficarJwt, verificarAdm, deleteUser);

export { router };
