const { ObjectId } = require('mongodb');
const con = require('./connections');

const loginSearch = async (email) => {
  const db = await con();
  const user = await db.collection('user').findOne({ email });
  return user;
};

const userSeachById = async (id) => {
  const db = await con();
  const user = await db.collection('user').findOne({ _id: ObjectId(id) });
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
  return newUser;
};

const createFavorite = async (id, added, word) => {
  const db = await con();
  return db.collection('user')
    .updateOne({ _id: ObjectId(id) }, { $set: { favorites: [{ added, word }] } });
};

const addWord = async (id, added, word) => {
  const db = await con();
  return db.collection('user')
    .updateOne({ _id: ObjectId(id) }, { $push: { favorites: { added, word } } });
};

const removeWord = async (id, word) => {
  const db = await con();
  return db.collection('user')
    .updateOne({ _id: ObjectId(id) }, { $pull: { favorites: { word } } });
};

module.exports = {
  loginSearch,
  userSeach,
  userSeachById,
  register,
  createFavorite,
  addWord,
  removeWord
};
