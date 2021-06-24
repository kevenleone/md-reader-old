import { NextSeo } from "next-seo";

import useLang from "@/hooks/useLang";

const Index: React.FC = () => {
  const i18n = useLang();

  return (
    <div className="pl-5 pr-5">
      <NextSeo
        title={i18n.sub("app-title-x", "home")}
        description={i18n.get("site-description")}
      />
      <h2>Read - how_to_minimize_bleeding_themes</h2>
    </div>
  );
};

export default Index;
