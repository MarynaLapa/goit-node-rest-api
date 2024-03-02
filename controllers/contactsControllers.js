import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import Contact from "../models/contact.js";

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    console.log('first', owner)
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");

    const sort = result.sort((a, b) => a.favorite > b.favorite ? -1 : 1);
    
    res.json(sort);
};

const getOneContact = async (req, res) => {
    const result = await Contact.findOne({_id: req.params.id, owner: req.user._id })
    if (!result) {
        throw HttpError(404)
    };
    res.json(result);
};

const deleteContact = async(req, res) => {
    const result = await Contact.findOneAndDelete({_id: req.params.id, owner: req.user._id });
    if (!result) {
        throw HttpError(404)
    }
    res.json({
        message: "Delete success",
    })
};

const createContact = async (req, res) => {
    const { _id: owner } = req.user;
    
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const result = await Contact.findOneAndUpdate({_id: req.params.id, owner: req.user._id }, req.body, {new: true});
    if (!result) {
        throw HttpError(400)
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const result = await Contact.findOneAndUpdate({_id: req.params.id, owner: req.user._id }, req.body, {new: true});
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
}

const controllers = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};

export default controllers;