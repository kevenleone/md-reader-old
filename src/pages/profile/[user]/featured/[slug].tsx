import { Articles } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
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
  markdown: string;
  user: User;
};

const Profile: React.FC<ProfileProps> = ({ article, markdown, user }) => {
  const { asPath, isFallback } = useRouter();

  if (isFallback) {
    return <b>Loading...</b>;
  }

  return (
    <Container>
      <ProfileLayout user={user} />

      <Article
        filePath={getFilePath(article.fileUrl)}
        title={article.name}
        breadCrumbPath={asPath.split("/").filter(Boolean)}
        markdown={markdown}
        publishedAt={article.created_at.toISOString()}
        author={{ avatar_url: user.avatar_url, name: article.name }}
      />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    include: { Articles: true, Folder: true },
    where: { Articles: { every: { featured: true } } },
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

  const [githubUser] = await Promise.all([
    fetcher<User>(`https://api.github.com/users/${username}`),
    prisma.user.findFirst({
      where: { login: username as string },
    }),
  ]);

  const article = await prisma.articles.findFirst({
    where: { slug: slug as string },
  });

  const response = await fetcher(article.fileUrl, null, true);

  const markdown = await response.text();

  return {
    props: {
      article,
      markdown,
      user: githubUser,
    },
  };
};

export default Profile;
