import express from "express";
import controllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidid.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, controllers.getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, controllers.getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, controllers.deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), controllers.createContact);

contactsRouter.put("/:id", authenticate, isValidId, validateBody(updateContactSchema), controllers.updateContact);

contactsRouter.patch("/:id/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), controllers.updateStatusContact)

export default contactsRouter;
