const express = require("express");
const {
  RagisterUser,
  LoginUser,
  GetAllUsers,
} = require("../Controllers/user-controller");
const EnsureAuthorized = require("../Middlewares/auth");
const router = express.Router();

router.post("/registration", RagisterUser);
router.post("/login", LoginUser);
router.get("/all-users", EnsureAuthorized, GetAllUsers);

module.exports = router;
