import express from "express";
import { currentUser } from "@microservices-projects/common";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  console.log("req  - session", req.currentUser)
    res.send({ currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
