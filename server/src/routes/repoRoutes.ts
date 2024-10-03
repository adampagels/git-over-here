import express from "express";
import {
  getRepos,
  openInEditor,
  getRepoDetails,
} from "../controllers/repoController";

const router = express.Router();

router.get("/repos/get-all/:path(*)", getRepos);
router.get("/repos/details/:repoPath(*)", getRepoDetails);
router.post("/repos/open-in-editor", openInEditor);

export default router;
