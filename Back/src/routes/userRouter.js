const { Router } = require("express");
const { get_users } = require("../controllers/user");

const router = Router();
router.get("/", get_users);

module.exports = router;
