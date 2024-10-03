"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "../services/repositoryService";

export const useRepositories = (reposPath: string) => {
  return useQuery({
    queryKey: ["repositories", reposPath],
    queryFn: () => fetchRepositories(reposPath),
  });
};
