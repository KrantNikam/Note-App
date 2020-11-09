import User from '../../models/user';

export const getUser = async (conditions, fields = null) => User.findOne(conditions, fields);

export const createUser = async (obj) => {
  const user = await User(obj).save();
  return user;
};