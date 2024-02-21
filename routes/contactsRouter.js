import express from "express";
import controllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controllers.getAllContacts);

contactsRouter.get("/:id", isValidId, controllers.getOneContact);

contactsRouter.delete("/:id", isValidId, controllers.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), controllers.createContact);

contactsRouter.put("/:id", isValidId, validateBody(updateContactSchema), controllers.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, validateBody(updateFavoriteSchema), controllers.updateStatusContact)

export default contactsRouter;
