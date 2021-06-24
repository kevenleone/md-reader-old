import ClayBreadcrumb from "@clayui/breadcrumb";
import ClayLayout from "@clayui/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import Loading from "@/components/loading/Loading";
import Markdown from "@/components/markdown";
import TreeView from "@/components/tree/TreeView";
import useLang from "@/hooks/useLang";
import { fetcher } from "@/services/fetch";
import { FileTree } from "@/types";

const fileType = (type) => (type === "blob" ? "z" : "a");

const getFileName = (id: string[]) => [...id].pop();

type PreviewProps = {
  markdown: string;
  fileTree: FileTree[];
};

interface TreeResponse {
  sha: string;
  url: string;
  tree: FileTree[];
}

interface BlobResponse {
  sha: string;
  node_id: string;
  url: string;
  size: number;
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ fileTree, markdown }) => {
  const {
    isFallback,
    push,
    query: { id = [] },
  } = useRouter();

  const i18n = useLang();

  const contentName = getFileName(id as string[]);

  const filePaths = (id as string[]).map((path, index, array) => ({
    active: index === array.length - 1,
    label: path,
    onClick: () =>
      push(`/preview/${[...array].splice(0, index + 1).join("/")}`),
  }));

  if (isFallback) {
    return <Loading className="mt-4" />;
  }

  return (
    <ClayLayout.Container>
      <NextSeo title={i18n.sub("app-title-x", contentName, false)} />

      <ClayBreadcrumb
        className="mt-4 mb-3"
        ellipsisBuffer={3}
        items={filePaths}
      />

      <>
        {markdown && <Markdown>{markdown}</Markdown>}

        {fileTree.length > 0 && (
          <TreeView path={(id as string[]).join("/")} fileTree={fileTree} />
        )}
      </>
    </ClayLayout.Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      { params: { id: ["liferay-labs-br", "liferay-grow"] } },
      { params: { id: ["liferay", "liferay-frontend-guidelines"] } },
    ],
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const [account, repository, ...path] = ctx.params.id;

  let markdown = "";
  let fileTree = [];
  let notFound = false;

  const fileName = getFileName(path);

  if (account && repository) {
    try {
      const data = await fetcher<TreeResponse>(
        `https://api.github.com/repos/${account}/${repository}/git/trees/HEAD:?recursive=1`
      );

      if (path.length) {
        const fileExistOnGithub = data.tree?.find(({ path }) =>
          path.includes(fileName)
        );

        if (fileExistOnGithub) {
          const response = await fetcher<BlobResponse & TreeResponse>(
            fileExistOnGithub.url
          );

          if (fileExistOnGithub.type === "blob") {
            markdown = Buffer.from(response.content, "base64").toString(
              "ascii"
            );
          } else {
            fileTree = response.tree;
          }
        }
      } else {
        fileTree = data.tree
          .filter(({ path }) => !path.includes("/"))
          .sort((a, b) => fileType(a.type).localeCompare(fileType(b.type)));
      }
    } catch (err) {
      notFound = true;
    }
  }

  return {
    notFound,
    props: {
      fileTree,
      markdown,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Preview;
