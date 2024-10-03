"use client";

import { useRepositories } from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Repo } from "@/types/types";

interface Props {
  repoPath: string;
}

export default function RepositoryList({ repoPath }: Props) {
  const { data, isLoading, error } = useRepositories(repoPath);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading repositories</div>;

  return (
    <div className="flex flex-wrap max-w-lg gap-3 justify-center">
      {data?.map((repo: Repo) => (
        <RepositoryItem key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
