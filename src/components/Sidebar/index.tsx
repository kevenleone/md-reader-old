import { ClayVerticalNav } from "@clayui/nav";
import classNames from "classnames";
import React from "react";

import useLang from "@/hooks/useLang";

type SidebarProps = {
  className?: string;
  itemsMenu: typeof ClayVerticalNav.defaultProps.items;
};

const Sidebar: React.FC<SidebarProps> = ({ className, itemsMenu }) => {
  const i18n = useLang();

  return (
    <div className={classNames("sidebar-component", className)}>
      <div className="sidebar-component__content">
        <div className="sidebar-component__title">
          <img src="/assets/dxp-icon.svg"></img>
          <span className="ml-2">{i18n.get("app-title")}</span>
        </div>
        <ClayVerticalNav items={itemsMenu} large={false} />
      </div>
    </div>
  );
};

export default Sidebar;
