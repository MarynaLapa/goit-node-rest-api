import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'url';

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

const updateAvatar = async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.file', req.file)
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const userDir = path.join(__dirname, "../public", "books");
    console.log('userDir', userDir)
    const { path: tempUpload, originalname } = req.file;
    console.log('tempUpload', tempUpload)
    console.log('originalname', originalname)
    const resultUpload = path.join(userDir, originalname);
    
    await fs.rename(tempUpload, resultUpload);
};

const controllers = {
    getAllUsers: ctrlWrapper(getAllUsers),
    getOneUser: ctrlWrapper(getOneUser),
    deleteUser: ctrlWrapper(deleteUser),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}

export default controllers;