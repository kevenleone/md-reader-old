import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import readingTime from "reading-time";
import useSWR from "swr";

import BreadCrumb from "@/components/BreadCrumb";
import Container from "@/components/Container";
import Markdown from "@/components/markdown";
import { fetcher } from "@/lib/fetch";
// import ViewCounter from "@/components/ViewCounter";

export default function BlogLayout({ markdown = "" }) {
  const {
    query: { id = [] },
  } = useRouter();

  const [account, repository, ...filePath] = id;
  const user = `${account}/${repository}`;

  const file = filePath
    .join("/")
    .replace("blob/master", "")
    .replace("blob/main", "");

  const { data = [] } = useSWR<any>(
    file
      ? `https://api.github.com/repos/${user}/commits?path=${file}&per_page=1`
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
    slug: filePath.join("-").toLowerCase(),
    summary: "Testanndo...",
    title: filePath[filePath.length - 1],
  };

  return (
    <Container
      title={commit.title}
      description={commit.summary}
      image={`https://github.com/${user}.png`}
      date={new Date(commit.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {commit.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            {commit.author.avatar_url && (
              <Image
                alt={commit.author.name}
                height={24}
                width={24}
                src={commit.author.avatar_url}
                className="rounded-full"
              />
            )}

            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {`${commit.author.name} / `}
              {format(parseISO(commit.publishedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {readingTime(markdown).text}
            {` • `}
            {/* <ViewCounter slug={commit.slug} /> */}
          </p>
        </div>

        <div className="mt-5">
          <BreadCrumb />
        </div>

        <div className="w-full prose dark:prose-dark max-w-none">
          <Markdown
            params={{ path: filePath, project: `${account}/${repository}` }}
          >
            {markdown}
          </Markdown>
        </div>
      </article>
    </Container>
  );
}
