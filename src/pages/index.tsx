import { signIn, signOut, useSession } from "next-auth/react";

import Container from "../components/Container";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Home = () => {
  const { data: session } = useSession();

  console.log(session);

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
