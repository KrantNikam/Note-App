import * as bcrypt from 'bcryptjs';

export const hashSync = (password) => bcrypt.hashSync(password, 10);

export const comparePassword = (newPassword, originalPassword) => bcrypt
  .compareSync(newPassword, originalPassword);