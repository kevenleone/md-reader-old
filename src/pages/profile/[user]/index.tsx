import { Articles, Folder } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Container from "@/components/Container";
import ProfileLayout from "@/layouts/profile";
import { fetcher } from "@/lib/fetch";
import prisma from "@/lib/prisma";
import { User } from "@/lib/types";

type ProfileProps = {
  folders: Folder[];
  featuredArticles: Articles[];
  articles: Articles[];
  user: User;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    params: { user: username },
  } = ctx;

  const session = await getSession({ ctx });

  const featuredArticles = [];
  const articles = [];

  const [githubUser, user] = await Promise.all([
    fetcher<User>(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    }),
    prisma.user.findFirst({
      where: { login: username as string },
    }),
  ]);

  const [folders, articlesAll] = await Promise.all([
    prisma.folder.findMany({
      orderBy: { name: "asc" },
      where: { folderId: null, userId: user.id },
    }),
    prisma.articles.findMany({
      orderBy: { name: "asc" },
      where: { folderId: null, userId: user.id },
    }),
  ]);

  for (const article of articlesAll) {
    if (article.featured) {
      featuredArticles.push(article);
    } else {
      articles.push(article);
    }
  }

  return {
    props: {
      articles,
      featuredArticles,
      folders,
      user: githubUser,
    },
  };
};

const Profile: React.FC<ProfileProps> = ({
  articles,
  featuredArticles,
  folders,
  user,
}) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <b>Loading...</b>;
  }

  const followUser = () => {
    signIn("github");
  };

  return (
    <Container>
      <ProfileLayout
        featuredArticles={featuredArticles}
        articles={articles}
        folders={folders}
        user={user}
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
    </Container>
  );
};

export default Profile;
