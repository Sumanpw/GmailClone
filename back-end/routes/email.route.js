import express from "express";
import {
  createEmail,
  deleteEmail,
  getAllEmailById,
} from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Route to create an email (POST request)
router.route("/create").post(isAuthenticated, createEmail);

// Route to delete an email (using DELETE method)
router.route("/:id").delete(isAuthenticated, deleteEmail);

router.route("/getallemails").get(isAuthenticated, getAllEmailById);

export default router;
