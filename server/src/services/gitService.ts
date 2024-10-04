import * as git from "isomorphic-git";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { CommitDetail, RepoDetail } from "../types/types";
import { promisify } from "util";

export const getAllRepos = async () => {
  const reposBasePath = "/usr/src/app/workspace";
  const repos: Array<{ name: string; path: string; branches: string[] }> = [];

  try {
    const directories = fs.readdirSync(reposBasePath, { withFileTypes: true });

    for (const dir of directories) {
      if (dir.isDirectory()) {
        const repoPath = path.join(reposBasePath, dir.name);

        if (fs.existsSync(path.join(repoPath, ".git"))) {
          const branches = await git.listBranches({ fs, dir: repoPath });

          const repoDetails = {
            name: dir.name,
            path: repoPath,
            branches,
          };
          repos.push(repoDetails);
        }
      }
    }
  } catch (error) {
    console.error("Error in getAllRepos:", error);
    throw new Error("Failed to fetch repositories");
  }

  return repos;
};

export const openInEditorService = async (
  repoPath: string,
  editorCommand: string
): Promise<string> => {
  const execAsync = promisify(exec);

  const absolutePath = path.resolve(repoPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error("Path does not exist");
  }

  try {
    await execAsync(`${editorCommand} ${absolutePath}`);
    return `Opened project at ${absolutePath} in ${editorCommand}`;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error opening editor: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
    throw new Error("Failed to open code editor.");
  }
};

export const getRepositoryDetails = async (
  repoPath: string
): Promise<RepoDetail> => {
  const repoName = path.basename(repoPath);
  try {
    const repoName = path.basename(repoPath);

    const branches = await git.listBranches({ fs, dir: repoPath });

    const lastCommits = await git.log({
      fs,
      dir: repoPath,
      depth: 20,
    });

    const commitDetails: CommitDetail[] = lastCommits.map((commit) => {
      const {
        oid,
        commit: { message, author },
      } = commit;

      return {
        oid,
        message,
        author: {
          name: author.name || "Unknown",
          email: author.email || "Unknown",
        },
        date: new Date(author.timestamp * 1000).toISOString(),
      };
    });

    return {
      repoName,
      branches,
      lastCommits: commitDetails,
    };
  } catch (error) {
    console.error("Error in getRepositoryDetails:", error);
    throw new Error("Failed to retrieve repository details");
  }
};
