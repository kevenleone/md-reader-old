import ClayNavigationBar from "@clayui/navigation-bar";
import { NextRouter, useRouter } from "next/router";
import React from "react";

import useLang from "@/hooks/useLang";

import NavigationOptions from "../navigation-options";

const getPath = (router: NextRouter, i18n) => {
  if (Object.keys(router.query).length) {
    if (Array.isArray(router.query.id)) {
      return router.query.id[router.query.id.length - 1];
    }

    return router.query.id;
  }

  return router.pathname === "/"
    ? i18n.get("app-title")
    : i18n.get(router.pathname);
};

type NavigationBarProps = {
  leftButton?: React.ReactElement;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ leftButton }) => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <ClayNavigationBar className="NavigationBar" triggerLabel="Navigation">
      <ClayNavigationBar.Item className="item" active>
        <>
          {leftButton}
          <strong className="ml-2">{getPath(router, i18n)}</strong>
        </>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item className="item" active>
        <NavigationOptions />
      </ClayNavigationBar.Item>
    </ClayNavigationBar>
  );
};

export default NavigationBar;
