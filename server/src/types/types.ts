import { Request } from "express";

export interface OpenEditorRequest extends Request {
  body: {
    repoPath: string;
    editor?: string;
  };
}

export interface CommitDetail {
  oid: string;
  message: string;
  author: {
    name: string;
    email: string;
  };
  date: string;
}

export interface RepoDetail {
  repoName: string;
  branches: string[];
  lastCommits: CommitDetail[];
}
