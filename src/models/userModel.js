const con = require('./connections');

const loginSearch = async (email) => {
  const db = await con();
  const user = await db.collection('user').findOne({ email });
  return user;
};

const userSeach = async (name, email) => {
  const db = await con();
  const user = await db.collection('user').findOne({ name, email });
  return user;
};

const register = async (name, email, password) => {
  const db = await con();
  const newUser = await db
    .collection('user').insertOne({ name, email, password });
  return newUser.ops[0];
};

const updateUser = async (name, email, newName, newEmail) => {
  const db = await con();
  await db.collection('user')
    .updateOne({ name, email }, { $set: { nome: newName, email: newEmail } });

  const user = await buscaUsuario(newName, newEmail);
  return user;
};

module.exports = {
  loginSearch,
  userSeach,
  register,
  updateUser,
};
