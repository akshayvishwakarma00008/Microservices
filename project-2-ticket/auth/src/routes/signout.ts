import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res)=>{
    res.send("Welcome to user profile");
})

export { router as signOutRouter }; 