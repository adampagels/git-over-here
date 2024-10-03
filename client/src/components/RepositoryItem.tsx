import { Repo } from "@/types/types";
import Card from "./Card";
import Button from "./Button";
import { useOpenRepoInEditor } from "../hooks/useOpenRepo";
import Link from "next/link";
interface RepositoryItem {
  repo: Repo;
}

export default function RepositoryItem({ repo }: RepositoryItem) {
  const repoLength = repo?.branches?.length;
  const { mutate: openRepo, error } = useOpenRepoInEditor(
    (data) => {
      console.log("Repository opened successfully:", data);
    },
    (error) => {
      console.error("Error opening repository:", error);
    }
  );

  const handleOpenRepo = () => {
    openRepo({
      repoPath: repo?.path,
      editorCommand: "code", // Opening in VSCode
    });
  };

  // if (isLoading) return <div>Opening repository...</div>;
  if (error) return <div>Error opening repository: {error.message}</div>;

  return (
    <Card>
      <h2 className="dark:text-black light:text-white">{repo.name}</h2>
      <p className="dark:text-black light:text-white">
        {repoLength} {repoLength > 1 ? "Branches" : "Branch"}
      </p>
      <div className="flex gap-3">
        <Link href={`/repo/${encodeURIComponent(repo.name)}`}>
          <Button onClick={() => console.log("view details clicked")}>
            <h3>View details</h3>
          </Button>
        </Link>
        <Button onClick={() => handleOpenRepo()}>
          <h3>Open in IDE</h3>
        </Button>
      </div>
    </Card>
  );
}
