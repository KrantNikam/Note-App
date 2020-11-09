import * as express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();
const envPort = process.env.PORT;
const envHOST = process.env.HOST;

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Swagger',
      version: '1.0.0',
      description: ''
    },
    schemes: ['http'],
    host: `${envHOST}:${envPort}`,
    basePath: '/',
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'x-access-token',
        in: 'header',
      },
    },
  },
  apis: ['./src/swagger/controllers/users.ts', './src/swagger/models/user-model.ts'],
};


const swaggerSpec = swaggerJSDoc(options);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(name, model, false, true);
  if (!responseValidation.valid) {
    throw new Error('Model doesn\'t match Swagger contract');
  }
}

export default { router, validateModel };
