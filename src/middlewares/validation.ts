import Messages from "../common/messages";
import * as userLib from '../modules/auth/auth.lib';

export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isMatch = regex.test(email);
  return isMatch;
};

export const isUserNameExist = async (userName) => {
  const user = await userLib.getUser({ userName });
  if (user) return true;
  return false;
};

export const isEmailIDExist = async (email) => {
  const user = await userLib.getUser({ email });
  if (user) return true;
  return false;
};

const validate = async (input) => {
  const { userName, email, password } = input;

  if (!userName) throw new Error(Messages.UAERNAME_REQUIRED);
  if (!password) throw new Error(Messages.PASSWORD_REQUIRED);

  const isUserName = await isUserNameExist(userName);

  if (isUserName) throw new Error(Messages.USERNAME_EXIST);
  if (email) {
    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      const isEmailExist = await isEmailIDExist(email);
      if (isEmailExist) throw new Error(Messages.EMAIL_EXIST);
    } else {
      throw new Error(Messages.INVALID_EMAIL);
    }
  }
  
  return true;
};

export default validate;
