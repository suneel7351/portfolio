import express from "express";
import {
  contact,
  deleteProjects,
  deleteTimeline,
  getUser,
  login,
  logout,
  myProfile,
  project,
  timeline,
  updateUser,
} from "../controller/User.js";

import { Auth } from "../middleware/authenticate.js";
export const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/user").get(getUser);
router.route("/me").get(Auth, myProfile);
router.route("/contact").post(contact);
router.route("/admin/update").put(Auth, updateUser);
router.route("/admin/timeline").post(Auth, timeline);
router.route("/admin/project").post(Auth, project);
router.route("/admin/timeline/:id").delete(Auth, deleteTimeline);
router.route("/admin/project/:id").delete(Auth, deleteProjects);
