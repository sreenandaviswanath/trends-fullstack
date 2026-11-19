const express = require("express");
const { getAllusers, createUser, deleteUser, userLogin, updateUserRole, updateUserStatus, userLogout } = require("../controllers/userController");
const { authorizeUser, userAuthenticate } = require("../middlewares/auth");

const router = express.Router();

router.route("/signup").post(createUser);

router.route("/login").post(userLogin);

router.route("/logout").post(userAuthenticate, userLogout);

router.route("/allusers").get(userAuthenticate, authorizeUser(["admin"]), getAllusers);

router.route("/:id").delete(userAuthenticate, authorizeUser(["admin"]), deleteUser);

router.route("/role-updated/:id").patch(userAuthenticate, authorizeUser(["admin"]), updateUserRole);

router.route("/status-updated/:id").patch(userAuthenticate, authorizeUser(["admin"]), updateUserStatus);

module.exports = router;