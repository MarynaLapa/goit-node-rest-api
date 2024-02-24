import express from 'express';
import controllers from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidid.js';
import { loginSchema, registerSchema, subscriptionSchema } from '../schemas/usersSchema.js';

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), controllers.register);

usersRouter.post('/login', validateBody(loginSchema), controllers.login);

usersRouter.get('/current', authenticate, controllers.current);

usersRouter.post('/logout', authenticate, controllers.logout);

usersRouter.get("/", controllers.getAllUsers);

usersRouter.get("/:id", isValidId, controllers.getOneUser);

usersRouter.post("/:id", isValidId, controllers.deleteUser);

usersRouter.patch('/:id/subscription', authenticate, validateBody(subscriptionSchema), controllers.updateSubscription);

export default usersRouter;