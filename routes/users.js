const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting all user
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: err.message});
    }

});

// Getting one user
router.get("/:id", getUser, (req, res) => {
    res.send(res.user);
});

// Registering user
router.post("/", async (req, res) => {
    const user = new User({});
    if (req.body.userName != null) {
        user.userName= req.body.userName
    }
    if (req.body.fullName != null) {
        user.fullName= req.body.fullName
    }
    if (req.body.email != null) {
        user.email= req.body.email
    }
    if (req.body.password != null) {
        user.password= req.body.password
    }
    if (req.body.dateOfBirth != null) {
        user.dateOfBirth = req.body.dateOfBirth;
    }

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Updating user
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.userName != null) {
        res.user.userName = req.body.userName;
    }
    if (req.body.fullName != null) {
        res.user.fullName = req.body.fullName;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.dateOfBirth != null) {
        res.user.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.roleId != null) {
        res.user.roleId = req.body.roleId;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Deleting user
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({message: "User has been removed."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: "Cannot find user."});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.user = user;
    next();
}

module.exports = router;
