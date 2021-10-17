import { GetStaticPaths, GetStaticProps } from "next";
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
    isFallback,
    query: { id = [] },
  } = useRouter();

  const [account, repository, ...filePath] = id;

  if (isFallback) {
    return <b>Loading</b>;
  }

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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      { params: { id: ["liferay-labs-br", "liferay-grow"] } },
      { params: { id: ["liferay", "liferay-frontend-projects"] } },
    ],
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const [account, repository, ...path] = ctx.params.id as string[];

  let fileTree = [];
  let markdown = "";
  let notFound = false;

  if (account && repository) {
    try {
      const data = await fetcher<any>(
        `https://api.github.com/repos/${account}/${repository}/git/trees/HEAD:?recursive=1`
      );

      if (path.length) {
        const fileExistOnGithub = data.tree?.find(
          ({ path: filePath }) => path.join("/") === filePath
        );

        if (fileExistOnGithub) {
          const response = await fetcher<any>(fileExistOnGithub.url);

          if (fileExistOnGithub.type === "blob") {
            markdown = Buffer.from(response.content, "base64").toString(
              "ascii"
            );
          } else {
            fileTree = response.tree;
          }
        }
      } else {
        fileTree = data.tree.filter(({ path }) => !path.includes("/"));
      }
    } catch (err) {
      notFound = true;
    }
  }

  return {
    notFound,
    props: {
      account,
      fileTree,
      markdown,
      path,
      repository,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Preview;
