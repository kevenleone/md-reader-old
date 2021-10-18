import { Articles, Folder } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

import Article from "@/components/Article";
import Container from "@/components/Container";
import ProfileLayout from "@/layouts/profile";
import { fetcher } from "@/lib/fetch";
import prisma from "@/lib/prisma";
import { User } from "@/lib/types";
import { getFilePath } from "@/lib/util";

type ProfileProps = {
  article: Articles;
  folders: Folder[];
  articles: Articles[];
  markdown: string;
  user: User;
};

const Profile: React.FC<ProfileProps> = ({
  article,
  articles,
  folders,
  markdown,
  user,
}) => {
  const { asPath, isFallback } = useRouter();

  if (isFallback) {
    return <b>Loading...</b>;
  }

  const followUser = () => {
    signIn("github");
  };

  return (
    <Container
      customMeta={{
        description: `${article?.name} description...`,
        image: `https://md-reader.vercel.app/api/thumbnail?title=${
          article?.name || "Empty"
        }&bg=black`,
        title: article?.name,
      }}
    >
      <ProfileLayout
        articles={articles}
        folders={folders}
        user={user}
        mergeFolderAndArticles
      >
        <div>
          <button
            className="p-3 dark:bg-white bg-black rounded mb-8"
            onClick={followUser}
          >
            Follow Me
          </button>

          <button
            className="p-3 ml-4 dark:bg-white bg-black rounded mb-8"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </ProfileLayout>

      {article && (
        <Article
          filePath={getFilePath(article.fileUrl)}
          title={article.name}
          breadCrumbPath={asPath.split("/").filter(Boolean)}
          markdown={markdown}
          publishedAt={article.created_at.toISOString()}
          author={{ avatar_url: user.avatar_url, name: article.name }}
        />
      )}
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    include: { Articles: true, Folder: true },
  });

  const paths = users.map((user) => ({
    params: {
      slug: user.Folder.map(({ slug }) => slug),
      user: user.login,
    },
  }));

  await prisma.$disconnect();

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    params: { slug, user: username },
  } = ctx;

  const slugs = slug as string[];

  let markdown;
  let folders = [];
  let articles = [];
  let article;

  const isFilePreview = slugs.includes("preview");

  const lastSlug = (slug as string[])[slug.length - 1];

  const [githubUser, user, folder] = await Promise.all([
    fetcher<User>(`https://api.github.com/users/${username}`),
    prisma.user.findFirst({
      where: { login: username as string },
    }),
    prisma.folder.findFirst({
      where: { slug: lastSlug },
    }),
  ]);

  if (isFilePreview) {
    article = await prisma.articles.findFirst({ where: { slug: lastSlug } });
    const response = await fetcher(article.fileUrl, null, true);
    markdown = await response.text();
  } else {
    [folders, articles] = await Promise.all([
      prisma.folder.findMany({
        orderBy: { name: "asc" },
        where: { folderId: folder.id, userId: user.id },
      }),
      prisma.articles.findMany({
        orderBy: { name: "asc" },
        where: { folderId: folder.id, userId: user.id },
      }),
    ]);
  }

  return {
    props: {
      article,
      articles,
      folders,
      markdown,
      user: githubUser,
    },
  };
};

export default Profile;
