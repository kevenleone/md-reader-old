import { GetServerSideProps } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const folders = await prisma.folder.findMany({
    include: { Folder: true, parentFolder: true },
  });

  return {
    props: {
      folders,
    },
  };
};

const Home = ({ folders }) => {
  const { data: session } = useSession();

  console.log(folders);

  return (
    <div className="text-white">
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p className="text-white">Not signed in</p>
          <button className="text-white" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
