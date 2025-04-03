import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res)=>{
    res.send("Welcome to user profile");
})

export { router as currentUserRouter }; 