import ClayButton from "@clayui/button";
import ClayLayout from "@clayui/layout";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";
import React from "react";

import SEO from "@/components/meta";
import AuthTemplate from "@/components/templates/AuthTemplate";
import useLang from "@/hooks/useLang";

const Auth = (): React.ReactElement => {
  const i18n = useLang();

  return (
    <AuthTemplate>
      <SEO title={i18n.sub("app-title-x", "Auth")} />

      <h1>{i18n.get("app-title")}</h1>
      <ClayLayout.Row className="mt-5">
        <ClayLayout.Col xl={12}>
          <ClayButton onClick={() => signIn("github")} className="btn-block">
            {i18n.get("sign-in-with-github")}
          </ClayButton>
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
