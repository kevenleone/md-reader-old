import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

import BlogLayout from "@/layouts/blog";
import FileTreeLayout from "@/layouts/file-tree";
import { fetcher } from "@/lib/fetch";

type PreviewProps = {
  account: any;
  fileTree: any[];
  markdown: string;
  repository: string;
};

const Preview: React.FC<PreviewProps> = ({ fileTree, markdown }) => {
  const {
    query: { id = [] },
  } = useRouter();

  const [account, repository, ...filePath] = id;

  if (fileTree.length) {
    return <FileTreeLayout fileTree={fileTree} />;
  }

  return (
    <BlogLayout
      project={`${account}/${repository}`}
      filePath={filePath}
      markdown={markdown}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [account, repository, ...path] = ctx.params.id as string[];

  const session = await getSession({ ctx });

  let fileTree = [];
  let markdown = "";

  if (account && repository) {
    try {
      const data = await fetcher(
        `https://api.github.com/repos/${account}/${repository}/git/trees/HEAD:?recursive=1`,
        {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        }
      );

      if (path.length) {
        const fileExistOnGithub = data.tree?.find(
          ({ path: filePath }) => path.join("/") === filePath
        );

        if (fileExistOnGithub) {
          const response = await fetcher(fileExistOnGithub.url, {
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
            },
          });

          if (fileExistOnGithub.type === "blob") {
            console.log("Heree11", response);
            markdown = Buffer.from(response.content, "base64").toString(
              "ascii"
            );
            console.log("Heree121");
          } else {
            fileTree = response.tree;
          }
        }
      } else {
        fileTree = data.tree.filter(({ path }) => !path.includes("/"));
      }
    } catch (err) {
      console.log({ err });
    }
  }

  return {
    props: {
      account,
      fileTree,
      markdown,
      path,
      repository,
    },
  };
};

export default Preview;
