import ClayButton from "@clayui/button";
import ClayLayout from "@clayui/layout";
import { Auth as SupaAuth } from "@supabase/ui";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";
import React, { useEffect } from "react";

import SEO from "@/components/meta";
import AuthTemplate from "@/components/templates/AuthTemplate";
import useLang from "@/hooks/useLang";
import supabase from "@/services/supabase";

const Auth = (): React.ReactElement => {
  const i18n = useLang();

  const onLogin = () => {
    // signIn("github");
    supabase.auth.signIn(
      { provider: "github" },
      { redirectTo: "http://localhost:3000" }
    );
  };

  const getLoggedUser = () => {
    const loggedUser = supabase.auth.user();

    console.log({ loggedUser });
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <AuthTemplate>
      <SEO title={i18n.sub("app-title-x", "Auth")} />

      {/* <h1>{i18n.get("app-title")}</h1> */}

      <ClayLayout.Row className="mt-5">
        <ClayLayout.Col xl={12}>
          <SupaAuth
            supabaseClient={supabase}
            providers={["google", "github"]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </ClayLayout.Col>
      </ClayLayout.Row>
    </AuthTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      statusCode: 307,
    },
  };
};

export default Auth;
