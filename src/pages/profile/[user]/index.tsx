import { Articles, Folder } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Container from "@/components/Container";
import ProfileLayout from "@/layouts/profile";
import { fetcher } from "@/lib/fetch";
import prisma from "@/lib/prisma";
import { User } from "@/lib/types";

type ProfileProps = {
  folders: Folder[];
  articles: Articles[];
  user: User;
};

const Profile: React.FC<ProfileProps> = ({ articles, folders, user }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <b>Loading...</b>;
  }

  const followUser = () => {
    signIn("github");
  };

  return (
    <Container>
      <ProfileLayout articles={articles} folders={folders} user={user}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    include: { Articles: true, Folder: true },
  });

  const paths = users.map((user) => ({
    params: {
      user: user.login,
    },
  }));

  await prisma.$disconnect();

  return { fallback: true, paths };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    params: { user: username },
  } = ctx;

  const [githubUser, user] = await Promise.all([
    fetcher<User>(`https://api.github.com/users/${username}`),
    prisma.user.findFirst({
      where: { login: username as string },
    }),
  ]);

  const [folders, articles] = await Promise.all([
    prisma.folder.findMany({
      orderBy: { name: "asc" },
      where: { folderId: null, userId: user.id },
    }),
    prisma.articles.findMany({
      orderBy: { name: "asc" },
      where: { folderId: null, userId: user.id },
    }),
  ]);

  return {
    props: {
      articles,
      folders,
      user: githubUser,
    },
  };
};

export default Profile;
