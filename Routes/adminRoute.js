import express from "express";
import dotenv from "dotenv";
import AdminLogin from "../Model/adminlogin.js";
dotenv.config();


//  initilizing the routes
const router = express.Router();

router.post("/cap-admin", async (req, res) => {
    try {
        // hashed password
        const salt = await bcrypt.getSalt(10);

        // Check if admin already exists with the given username
        const existingAdmin = await AdminLogin.findOne({ username: req.body.username });

        // validating if admin exist
        if (!existingAdmin) {
            const hashedpwd = await bcrypt.hash(req.body.password, salt)
            // Create a new admin with hashed password
            const newAdmin = new AdminLogin({
                username: req.body.username,
                password: hashedpwd,
            });
            const result = await newAdmin.save();

            res.status(201).json({ message: "Admin created successfully", data: result });

        } else {
            res.status(400).json({ message: "Admin with this username already exists" });

        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })

    }
})


export const adminRouter = router;