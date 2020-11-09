/**
 * @swagger
 * definitions:
 *   LogIn:
 *     type: object
 *     required:
 *       - userName
 *       - password
 *     properties:
 *       userName:
 *         type: string
 *       password:
 *         type: string
 *     items:
 *       $ref '#definitions/LogIn'
 *
 */
export class LogIn {
  userName: string;
  password: string;
  
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }
}

/**
 * @swagger
 * definitions:
 *   SignUp:
 *     type: object
 *     required:
 *       - userName
 *       - password
 *     properties:
 *       userName:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *     items:
 *       $ref '#definitions/SignUp'
 *
 */
export class SignUp {
  userName: string;
  password: string;
  email: string;

  constructor(userName, password, email) {
    this.userName = userName;
    this.password = password;
    this.email = email;
  }
}

/**
 * @swagger
 * definitions:
 *   Note:
 *     type: object
 *     required:
 *       - title
 *       - description
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *     items:
 *       $ref '#definitions/Note'
 *
 */
export class Note {
  title: any;
  description: any;
  
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}