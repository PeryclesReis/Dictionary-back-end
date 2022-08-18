const userServices = require('../services/userServices');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await userServices.existsUser(req.body);
  if(result.error) {
    return res.status(result.code).json({ message: result.message });
  }

  const userResgistering = await userServices.registerUser(name, email, password);
  return res.status(userResgistering.code).json({
    id: userResgistering.newUser.insertedId,
    nome: name,
    token: userResgistering.token,
    message: 'Usuário cadastrado com sucesso!'
  });
};

const login = async (req, res) => {
  const { email, passward } = req.body;

  const result = await userServices.loginUser(email, passward);
  if(result.error) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(result.code).json({ token: result.token, usuario: result.usuario });
};

module.exports = {
  login,
  registerUser
};