import { useMutation } from "@tanstack/react-query";
import { openRepoInEditor } from "../services/repositoryService";
import {
  OpenRepoError,
  OpenRepoResponse,
  OpenRepoVariables,
} from "@/types/types";

export const useOpenRepoInEditor = (
  onSuccess?: (data: OpenRepoResponse, variables: OpenRepoVariables) => void,
  onError?: (error: OpenRepoError, variables: OpenRepoVariables) => void
) => {
  return useMutation<OpenRepoResponse, OpenRepoError, OpenRepoVariables>({
    mutationFn: ({ repoPath, editorCommand }: OpenRepoVariables) => {
      return openRepoInEditor({ repoPath, editorCommand });
    },
    onSuccess,
    onError,
  });
};
