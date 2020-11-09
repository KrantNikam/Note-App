import { Request, Response } from "express";
import { generateJWT } from '../helpers/auth.helpers';
import * as ResponseHandler from '../helpers/response.handler';
import * as HttpStatus from 'http-status-codes';
import * as authLib from "../modules/auth/auth.lib";
import Messages from '../common/messages';
import { hashSync, comparePassword } from '../utils/utilities';
import validate from "../middlewares/validation";

class AuthController {
  static signup = async (req: Request, res: Response) => {
    try {
      const input = req.body;

      // validate request
      await validate(input);
      const obj = {
        userName: input.userName,
        password: hashSync(input.password),
        email: input.email
      };

      const user = await authLib.createUser(obj);
      if (!user) throw new Error(Messages.SOMETHING_WENT_WRONG);

      res.locals.message = Messages.SIGNUP_SUCCESS;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errorCode = HttpStatus.UNAUTHORIZED;
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const {userName, password} = req.body;

      const user = await authLib.getUser({ userName });
      if (!user) throw new Error(Messages.INVALID_USERNAME);

      // compare passwords
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw new Error(Messages.INVALID_PASSWORD);

      // generate token
      const payload = {
        userId: user.userId,
        email: user.email
      };
      const token = generateJWT(payload);

      const data = {
        userName: user.userName,
        email: user.email,
        token
      };
      res.locals.data = data;
      res.locals.message = Messages.LOGIN_SUCCESS;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errorCode = HttpStatus.UNAUTHORIZED;
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };
}

export default AuthController;