import { useRouter } from "next/router";
import useSWR from "swr";

import Article from "@/components/Article";
import Container from "@/components/Container";
import { fetcher } from "@/lib/fetch";

type BlogLayoutProps = {
  markdown: string;
  project: string;
  filePath: string[];
};

const BlogLayout: React.FC<BlogLayoutProps> = ({
  markdown = "",
  project,
  filePath = [],
}) => {
  const {
    query: { id = [] },
  } = useRouter();

  const file = filePath
    .join("/")
    .replace("blob/master", "")
    .replace("blob/main", "");

  const { data = [] } = useSWR<any>(
    file
      ? `https://api.github.com/repos/${project}/commits?path=${file}&per_page=1`
      : null,
    fetcher
  );

  const dataOne = data[0] || {};

  const commit = {
    author: {
      avatar_url: dataOne.author?.avatar_url || "",
      email: dataOne.commit?.author?.email || "",
      name: dataOne.commit?.author?.name || "",
    },
    publishedAt: dataOne.commit?.author?.date || new Date().toISOString(),
    // slug: filePath.join("-").toLowerCase(),
    summary: "Testanndo...",
    title: filePath[filePath.length - 1],
  };

  return (
    <Container
      title={commit.title}
      description={commit.summary}
      image={`https://github.com/${project}.png`}
      date={new Date(commit.publishedAt).toISOString()}
      type="article"
    >
      <Article
        filePath={filePath.join("/")}
        title={commit.title}
        breadCrumbPath={id as string[]}
        author={commit.author}
        markdown={markdown}
        publishedAt={commit.publishedAt}
      />
    </Container>
  );
};

export default BlogLayout;
