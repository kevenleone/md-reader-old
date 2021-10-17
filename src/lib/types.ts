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

export type User = {
  name: string;
  bio: string;
  company: string;
  avatar_url: string;
};

export type Repo = {
  description: string;
  id: number;
  owner: {
    avatar_url: string;
  };
};
