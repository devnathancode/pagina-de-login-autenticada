// criando a middleware para fazer a validaçao do usuario

function validarCadastro(req, res, next) {
    const { name, email, password } = req.body;

    // validaçao de email e password com middleware

    if (!name || !email || !password) {
        return res.status(400).json({
            mensagem: 'voce deve preencher todos os campos de digitaçao!'
        });
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        return res.status(400).json({
            mensagem: 'formato de email invalido!'
        });
    }
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({
            mensagem: 'a senha deve conter letras maiusculas!'
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            mensagem: 'a senha deve conter 6 caracteres ou mais!'
        });
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({
            mensagem: 'a senha deve conter letras minusculas!'
        });
    }
    if (!/[0-9]/.test(password)) {
        return res.status(400).json({
            mensagem: 'a senha deve conter um numero!'
        })
    }
    next();
}

// exportando para que outros arquivos possam importar

export default validarCadastro;