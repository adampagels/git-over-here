import { Request, Response } from "express";
import {
  getAllRepos,
  openInEditorService,
  getRepositoryDetails,
} from "../services/gitService";
import { OpenEditorRequest } from "../types/types";

export const getRepos = async (req: Request, res: Response) => {
  try {
    const repos = await getAllRepos();
    res.status(200).json(repos);
  } catch (error) {
    console.error("Error fetching repos:", error);
    res.status(500).json({ message: "Failed to fetch repositories." });
  }
};

export const openInEditor = async (
  req: OpenEditorRequest,
  res: Response
): Promise<void> => {
  const { repoPath, editor } = req.body;

  if (!repoPath) {
    res.status(400).json({ message: "Repository path is required." });
    return;
  }

  const editorCommand = editor || "code";

  try {
    const message = await openInEditorService(repoPath, editorCommand);
    res.status(200).json({ message });
  } catch (error: any) {
    console.error("Error in openInEditor:", error.message);
    res
      .status(500)
      .json({ message: "Failed to open repository in the code editor." });
  }
};

export const getRepoDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const repoPath: string = decodeURIComponent(req.params.repoPath);
  console.log(repoPath);
  try {
    const repoDetail = await getRepositoryDetails(repoPath);
    res.status(200).json(repoDetail);
  } catch (error) {
    console.error("Error fetching repository details:", error);
    res.status(500).json({ message: "Failed to retrieve repository details" });
  }
};
