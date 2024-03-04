import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'url';
import Jimp from "jimp";

import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js"
import { ctrlWrapper } from './../helpers/ctrlWrapper.js';
import register from './authControllers/register.js';
import login from './authControllers/login.js';
import current from './authControllers/current.js';
import logout from './authControllers/logout.js';
import verifyEmail from "./authControllers/verifyEmail.js";

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
    const { _id } = req.user;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const avatarDir = path.join(__dirname, "../", "public", "avatars");

    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;
    await Jimp.read(tempUpload)
        .then((image) => {
            return image
                .resize(250, 250) 
                .write(filename); 
        })
        .catch((err) => {
            console.error(err);
        });
    
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL
    });
};

const controllers = {
    getAllUsers: ctrlWrapper(getAllUsers),
    getOneUser: ctrlWrapper(getOneUser),
    deleteUser: ctrlWrapper(deleteUser),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}

export default controllers;