import { format, parseISO } from "date-fns";
import Image from "next/image";
import readingTime from "reading-time";

import BreadCrumb from "@/components/BreadCrumb";
import Markdown from "@/components/markdown";

type ArticleProps = {
  author: {
    name: string;
    avatar_url: string;
  };
  markdown: string;
  publishedAt: string;
  breadCrumbPath: string[];
};

const Article: React.FC<ArticleProps> = ({
  author,
  breadCrumbPath,
  markdown,
  publishedAt,
}) => {
  return (
    <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
      <h1 className="mb-4 font-bold tracking-tight text-black md:text-3xl sm:text-2xl lg:text-4xl dark:text-white">
        {author.name}
      </h1>
      <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
        <div className="flex items-center">
          {author.avatar_url && (
            <Image
              alt={author.name}
              height={24}
              width={24}
              src={author.avatar_url}
              className="rounded-full"
            />
          )}

          <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {`${author.name} / `}
            {format(parseISO(publishedAt), "MMMM dd, yyyy")}
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
          {readingTime(markdown).text}
          {` • `}
          {/* <ViewCounter slug={commit.slug} /> */}
        </p>
      </div>

      <div className="mt-5">
        <BreadCrumb paths={breadCrumbPath} />
      </div>

      <Markdown params={{ path: [], project: "" }}>{markdown}</Markdown>
    </article>
  );
};

export default Article;
