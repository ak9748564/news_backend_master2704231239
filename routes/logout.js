const express= require("express");
const router = express.Router();

//logour api
router.get("/", (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logout success", status:"success"});
});
module.exports = router;