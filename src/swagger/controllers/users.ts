import * as express from 'express';
import AuthController from '../../controllers/authController';
import NotesController from '../../controllers/notesController';

const router = express.Router();

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     description: Sign up
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: <b>userName</b> Required field <br/>  <b>password </b> Required field </br>
 *             <b> email </b> option field.
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Sign up successful
 *         schema:
 *           $ref: '#/definitions/SignUp'
 *
 */
router.post('/auth/sign-up', (req, res) => {
  const response = AuthController.signup;
  res.send(response);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: <b>UserName</b> Required field <br/>  <b>password </b> Required field </br>
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           $ref: '#/definitions/LogIn'
 *
 */
router.post('/auth/login', (req, res) => {
  const response = AuthController.login;
  res.send(response);
});

/**
 * @swagger
 * /notes:
 *   post:
 *     description: Create Note
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: note
 *         description: Note
 *         in: body
 *         required: true
 *         type: object
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Note Saved
 *         schema:
 *           $ref: '#/definitions/Note'
 *
 */
router.post('/notes', (req, res) => {
  const response = NotesController.createNote;
  res.send(response);
});

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     description: Update Note
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Note id
 *         in: path
 *         required: true
 *         type: number
 *       - name: note
 *         description: Note
 *         in: body
 *         required: true
 *         type: object
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Note Updated
 *         schema:
 *           $ref: '#/definitions/Note'
 *
 */
router.patch('/notes', (req, res) => {
  const response = NotesController.updateNote;
  res.send(response);
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     description: Get note by id
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: number
 *         description: note id.
 *         in: path
 *         required: true
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description:  Note Details
 */
router.get('/notes/:id', (req, res) => {
  const response = NotesController.getNote;
  res.send(response);
});

/**
 * @swagger
 * /notes?page&limit:
 *   get:
 *     description: Get notes(returns notes of logged in users)
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: page.
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: limit.
 *         in: query
 *         required: false
 *         type: number
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description:  Note Details
 */
router.get('/notes/:id', (req, res) => {
  const response = NotesController.getNotes;
  res.send(response);
});

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     description: Delete note by id
 *     tags:
 *       - Notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: number
 *         description: note id.
 *         in: path
 *         required: true
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description:  Note Details
 */
router.delete('/notes/:id', (req, res) => {
  const response = NotesController.deleteNote;
  res.send(response);
});