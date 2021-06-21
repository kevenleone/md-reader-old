import ClayContainer from "@clayui/layout/lib/Container";
import React from "react";

type PageProps = {
  title: string;
  headerButton?: React.ReactElement;
  children?: React.ReactElement;
};

const Page: React.FC<PageProps> = ({ children, headerButton, title }) => {
  return (
    <ClayContainer className="page">
      <div className="page__header">
        <h1>{title}</h1>
        {headerButton}
      </div>

      <div className="page__content">{children}</div>
    </ClayContainer>
  );
};

export default Page;
