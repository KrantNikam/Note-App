import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as HttpStatus from 'http-status-codes';
import * as dotenv from 'dotenv';
import * as ResponseHandler from '../helpers/response.handler';
import { getUser } from "../modules/auth/auth.lib";
import Messages from "../common/messages";
dotenv.config();

/**
 * Validate JWT token
 * @param req
 * @param res
 * @param next
 */
export const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the jwt token from the headers
    const token = <string>req.headers["x-access-token"];
    const jwtSecret = process.env.JWT_SECRET;

    // Validate the token
    const payload = <any>jwt.verify(token, jwtSecret);

    // get logged in user details from db
    const user = await getUser({ userId: payload.userId });
    if (!user) throw new Error(Messages.USER_DOES_NOT_EXIST);

    req.loggedInUser = user;
    next();
  } catch (e) {
    res.locals.errorCode = HttpStatus.UNAUTHORIZED;
    res.locals.errors = e.message;
    ResponseHandler.JSONERROR(req, res);
  }
};