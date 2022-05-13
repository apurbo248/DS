const router = require("express").Router();
const { register ,login} = require("../Controllers/UserController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
