import ClayNavigationBar from "@clayui/navigation-bar";
import React from "react";

import useLang from "@/hooks/useLang";

import NavigationOptions from "../navigation-options";

type NavigationBarProps = {
  leftButton?: React.ReactElement;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ leftButton }) => {
  const i18n = useLang();

  return (
    <ClayNavigationBar className="NavigationBar" triggerLabel="Navigation">
      <ClayNavigationBar.Item className="item" active>
        <>
          {leftButton}
          <strong className="ml-2">{i18n.get("sessions")}</strong>
        </>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item className="item" active>
        <NavigationOptions />
      </ClayNavigationBar.Item>
    </ClayNavigationBar>
  );
};

export default NavigationBar;
