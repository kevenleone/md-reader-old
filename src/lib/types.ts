export type FileTree = {
  mode: string;
  path: string;
  sha: string;
  type: "tree" | "blob";
  url: string;
};

export type Views = {
  total: number;
};

export type Repo = {
  description: string;
  id: number;
  owner: {
    avatar_url: string;
  };
};
