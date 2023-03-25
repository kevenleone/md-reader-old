import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import BlogPostCard from "@/components/BlogPostCard";
import FileCard from "@/components/VideoCard";
import { ArrowRight, File, Folder as FolderIcon } from "@/icons/icons";
import { User } from "@/lib/types";
import { getFilePath } from "@/lib/util";

import { Articles, Folder } from ".prisma/client";

type ProfileLayoutProps = {
  articles?: Articles[];
  featuredArticles?: Articles[];
  folders?: Folder[];
  mergeFolderAndArticles?: boolean;
  user: User;
};

type ArticleListProps = {
  path: string;
  articles: Articles[];
};

const ArticlesList: React.FC<ArticleListProps> = ({ articles, path }) => (
  <>
    {articles.map((article) => (
      <FileCard
        key={article.id}
        title={article.name}
        index={10}
        description="Awesome"
        href={`${path}/preview/${article.slug}`}
        icon={<File />}
      />
    ))}
  </>
);

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  articles = [],
  mergeFolderAndArticles,
  children,
  featuredArticles = [],
  folders = [],
  user,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto">
      <div className="flex flex-col-reverse sm:flex-row items-start">
        <div className="flex flex-col pr-8">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
            {user.name}
          </h1>
          <h2 className="text-gray-700 dark:text-gray-200 mb-4">
            {user.bio} at <span className="font-semibold">{user.company}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Helping developers build a faster web. Teaching about web
            development, serverless, and React / Next.js.
          </p>
        </div>
        <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Keven Leone"
            height={176}
            width={176}
            src={user.avatar_url}
            className="rounded-full"
          />
        </div>
      </div>

      {children}

      {Boolean(featuredArticles.length) && (
        <>
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Featured Articles
          </h3>
          <div className="flex gap-6 flex-col md:flex-row mb-4">
            {featuredArticles.map((article) => (
              <BlogPostCard
                key={article.id}
                title={article.name}
                slug={article.slug}
                fileUrl={getFilePath(article.fileUrl)}
                gradient="from-[#D8B4FE] to-[#818CF8]"
              />
            ))}
            <BlogPostCard
              title="Past, Present, and Future of React State Management"
              slug="react-state-management"
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
            <BlogPostCard
              title="Liferay Senna"
              slug="senna"
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
          </div>
        </>
      )}

      {Boolean(folders.length) && (
        <>
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            {mergeFolderAndArticles ? "Folders & Articles" : "Folders"}
          </h3>
          <div className="flex w-full flex-col mb-10">
            {mergeFolderAndArticles && (
              <ArticlesList articles={articles} path={router.asPath} />
            )}

            {folders.map((folder) => (
              <FileCard
                key={folder.id}
                title={folder.name}
                index={10}
                description="Awesome"
                href={`/${router.asPath}/folder/${folder.slug}`}
                icon={<FolderIcon />}
              />
            ))}
          </div>
        </>
      )}

      {Boolean(articles.length) && !mergeFolderAndArticles && (
        <>
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Articles
          </h3>
          <div className="flex w-full flex-col mb-10">
            <ArticlesList articles={articles} path={router.asPath} />

            <Link
              href="/blog"
              className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
            >
              Read all articles
              <ArrowRight />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileLayout;
