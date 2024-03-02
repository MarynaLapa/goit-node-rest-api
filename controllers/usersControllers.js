import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js"
import { ctrlWrapper } from './../helpers/ctrlWrapper.js';
import register from './authControllers/register.js';
import login from './authControllers/login.js';
import current from './authControllers/current.js';
import logout from './authControllers/logout.js';

const getAllUsers = async (req, res) => {
    const result = await User.find({}, "-createdAt -updatedAt");
    res.json(result);
};

const getOneUser = async (req, res) => {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
        throw HttpError(400);
    }
    res.json(result);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404);
    };
    res.json({
        message: "Delete success"
    });
}

const updateSubscription = async (req, res) => {
    const { id } = req.user;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(400);
    };
    res.json(result);
}

const controllers = {
    getAllUsers: ctrlWrapper(getAllUsers),
    getOneUser: ctrlWrapper(getOneUser),
    deleteUser: ctrlWrapper(deleteUser),
    updateSubscription: ctrlWrapper(updateSubscription),
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}

export default controllers;