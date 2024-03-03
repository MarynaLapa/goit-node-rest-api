import express from 'express';
import controllers from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import { loginSchema, registerSchema, subscriptionSchema } from '../schemas/usersSchema.js';
import upload from './../middlewares/upload.js';

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), controllers.register);

usersRouter.post('/login', validateBody(loginSchema), controllers.login);

usersRouter.get('/current', authenticate, controllers.current);

usersRouter.post('/logout', authenticate, controllers.logout);

usersRouter.get("/", controllers.getAllUsers);

usersRouter.get("/:id", controllers.getOneUser);

usersRouter.delete("/:id", controllers.deleteUser);

usersRouter.patch('/subscription', authenticate, validateBody(subscriptionSchema), controllers.updateSubscription);

usersRouter.patch('/avatars', authenticate, upload.single('avatar'), controllers.updateAvatar); 

export default usersRouter;