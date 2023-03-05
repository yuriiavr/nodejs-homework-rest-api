const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const {
  userValidation,
  loginValidation,
  subscriptionValidation,
  verifyEmailSchema,
} = require("../../middlewares/validationMiddlewares");
const ctrl = require("../../controllers/auth");
const { files: filesCtrl } = require("../../controllers");
const { authenticate, upload } = require("../../middlewares");

router.post("/signup", userValidation, asyncWrapper(ctrl.register));

router.post("/login", loginValidation, asyncWrapper(ctrl.login));

router.get("/current", authenticate, asyncWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  subscriptionValidation,
  asyncWrapper(ctrl.subscriptionStatus)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  asyncWrapper(filesCtrl.updateAvatar)
);

router.patch(
  "/",
  authenticate,
  subscriptionValidation,
  asyncWrapper(ctrl.subscriptionStatus)
);

router.get("/verify/:verificationToken", asyncWrapper(ctrl.verify));

router.post("/verify", verifyEmailSchema, asyncWrapper(ctrl.resendVerify));

module.exports = router;