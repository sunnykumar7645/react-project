const express = require("express")
const verifyToken = require("../moddlewares/authMiddleware")
const authorizeRole = require("../moddlewares/roleMiddleware")


const router = express.Router();

// Only admin can access
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
     res.json({message:"welcome to admin"})
})
// Both admin and manager can access
router.get("/manager", verifyToken, authorizeRole("admin", "manager"), (req, res) => {
    res.json({message:"welcome to manager"})
})
// all can access ths route
router.get("/user", verifyToken, authorizeRole("admin", "manager", "user"), (req, res) => {
    res.json({message:"welcome to user"})
})

module.exports = router;