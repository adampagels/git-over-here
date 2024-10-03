export const fetchRepositories = async (reposPath: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}get-all//${reposPath}`
  );
  if (!response.ok) throw new Error("Error fetching repositories");
  return response.json();
};

export const openRepoInEditor = async (params: {
  repoPath: string;
  editorCommand: string;
}) => {
  const { repoPath, editorCommand } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}open-in-editor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoPath, editorCommand }),
    }
  );

  if (!response.ok) {
    throw new Error("Error opening repository in editor");
  }

  return response.json();
};
