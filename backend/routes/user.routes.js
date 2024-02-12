const express = require('express');
const router = express.Router();
const Users = require('../models/Users');


router.post("/users/create", async (req, res) => {
    try {
        const { name, age } = req.body;
        const user = new Users({ name, age });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: "failed to create user", error })
    }
});

// 
router.get("/users/all", async (req, res) => {
    try {
        const users = await Users.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

//

router.get("/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(500).json({ error: "user not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

//

router.put("/users/update/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, age } = req.body;
        console.log({ name });
        const user = await Users.findByIdAndUpdate(
            userId,
            { name, age },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

//

router.delete("/users/delete/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.deleteUser(userId);

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;