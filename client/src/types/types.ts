export interface Repo {
  name: string;
  path: string;
  branches: string[];
}

export type OpenRepoResponse = {
  success: boolean;
  message: string;
};

export type OpenRepoError = {
  message: string;
  statusCode?: number;
};

export type OpenRepoVariables = {
  repoPath: string;
  editorCommand: string;
};
