import { Request, Response } from "express";
import * as ResponseHandler from '../helpers/response.handler';
import * as noteLib from '../modules/notes/notes.lib';
import Messages from "../common/messages";
import pagination from "../utils/pagination";

class NotesController {
  static createNote = async (req: Request, res: Response) => {
    try {
      const { loggedInUser } = req;
      const input = req.body;
      const obj = {
        title: input.title,
        description: input.description,
        userId: loggedInUser.userId
      };

      const data = await noteLib.createNote(obj);
      if (!data) throw new Error(Messages.SOMETHING_WENT_WRONG);

      res.locals.data = data;
      res.locals.message = Messages.SAVED;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };

  static updateNote = async (req: Request, res: Response) => {
    try {
      const noteId = parseInt(req.params.id, 10);
      const {
        title,
        description
      } = req.body;
      const obj: any = {};

      if (title) {
        obj.title = title;
      } 
      if (description) {
        obj.description = description;
      }
      const condition = { noteId }
      const data = await noteLib.updateNote(condition, obj);
      
      if (!data) throw new Error(Messages.SOMETHING_WENT_WRONG);

      res.locals.data = data;
      res.locals.message = Messages.UPDATED;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };

  static deleteNote = async (req: Request, res: Response) => {
    try {
      const noteId = parseInt(req.params.id, 10);
      const data = await noteLib.deleteNote({ noteId });

      res.locals.message = Messages.DELETED;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };

  static getNotes = async (req: Request, res: Response) => {
    try {
      const { loggedInUser, query } = req;
      // parse the query values and set default values
      const page = parseInt(query.page, 10) || 1;
      let limit = parseInt(query.limit, 10) || 10;

      const condition = { userId: loggedInUser.userId };
      const [total, data] = await Promise.all([
        noteLib.getNoteDocCount(condition),
        noteLib.getNotes(condition, page, limit),
      ]);

      if (!data.length) res.locals.message = Messages.NO_DATA;

      res.locals.pagination = pagination(page, limit, total);
      res.locals.data = data;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };

  static getNote = async (req: Request, res: Response) => {
    try {
      const noteId = parseInt(req.params.id, 10);
      const data = await noteLib.getNote({ noteId });
      if (!data) res.locals.message = Messages.NO_DATA;
      
      res.locals.data = data;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (e) {
      res.locals.errors = e.message;
      ResponseHandler.JSONERROR(req, res);
    }
  };

}

export default NotesController;