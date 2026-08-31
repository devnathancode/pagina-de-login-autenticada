import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
    path: '../../.env'
});

import jwt from 'jsonwebtoken';
import validarCadastro from './middlewares/validacao.js';
import verificarJwt from './middlewares/auth.js';
import { router } from './routes/publicroutes.js';
import bcrypt from 'bcrypt';

const app = express();

// middlewares

app.use(express.json());
app.use(cors());

// rota

app.use(router);



app.listen(3000, () => {
    console.log('servidor rodando!!!');
})