import express from 'express';
import NotesController from '../controllers/notesController';
import { validateJwt } from '../middlewares/validateJWT';
import isUserAuthorised from '../middlewares/authorize';

const router = express.Router();

router.get(
    '/:id',
    validateJwt,
    isUserAuthorised,
    NotesController.getNote,
);

router.get(
    '/',
    validateJwt,
    NotesController.getNotes,
);

router.post(
    '/',
    validateJwt,
    NotesController.createNote,
);

router.patch(
    '/:id',
    validateJwt,
    isUserAuthorised,
    NotesController.updateNote,
);

router.delete(
    '/:id',
    validateJwt,
    isUserAuthorised,
    NotesController.deleteNote,
);

export default router;