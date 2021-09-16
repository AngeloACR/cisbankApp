const express = require('express');
const userRouter = express.Router();
const auth = require("../auth/auth");
const User = require('../models/user');

//**************************** USER CRUD************************************//
userRouter.post('/', async(req, res) => {
    try {
        const user = {
            username: req.body.username,
            name: req.body.name,
            mail: req.body.mail,
            password: req.body.password,
            type: req.body.type,
        };

        let newUser = new User(user)
        let response = await User.addUser(newUser);
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }
});


// Delete user
userRouter.delete('/', auth, async(req, res, next) => {
    try {
        console.log('here');
        const item = req.query.item;

        let response = await User.deleteUser(item);
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }
});

// Update user, NEED TO IMPROVE
userRouter.put('/', auth, async(req, res, next) => {
    try {
        const user = req.user;
        const updateData = req.body.updateData;

        let response = await User.updateUser(updateData);
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }


});

// Get User
userRouter.get('/', auth, async(req, res, next) => {
    return res.json({
        user: req.user
    });
});

userRouter.get('/all', auth, async(req, res, next) => {
    try {

        let response = await User.getUsers();
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }

});

module.exports = userRouter;