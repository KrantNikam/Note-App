import * as ResponseHandler from '../helpers/response.handler';
import { getNote } from "../modules/notes/notes.lib";
import Messages from "../common/messages";

const isUserAuthorised = async (req, res, next) => {
  try {
    const { loggedInUser } = req;
    const noteId = parseInt(req.params.id, 10);
    const note = await getNote({ noteId });
    if (!note) throw new Error(Messages.NOTE_DOES_NOT_EXIST);

    if (note.userId !== loggedInUser.userId)
      throw new Error(Messages.UNAUTHORIZED);
    next();
  } catch (e) {
    res.locals.errors = e.message;
    ResponseHandler.JSONERROR(req, res);
  }
};

export default isUserAuthorised;
