import { ClayButtonWithIcon } from "@clayui/button";
import ClayIcon from "@clayui/icon";
import { useRouter } from "next/router";
import React from "react";

import NavigationBar from "@/components/navigation-bar";
import Sidebar from "@/components/sidebar";
import useLang from "@/hooks/useLang";
import useSidebar from "@/hooks/useSidebar";

const Layout: React.FC = ({ children }) => {
  const { showSidebar, toggleSidebar } = useSidebar({});

  const i18n = useLang();
  const router = useRouter();

  const menu = [
    {
      items: [
        {
          active: true,
          label: i18n.get("Bookmarks"),
          onClick: () => router.push("/session"),
        },
      ],
      label: (
        <>
          <ClayIcon symbol="home-full" className="mr-2" />
          {i18n.get("Home")}
        </>
      ),
    },
  ];

  return (
    <div className="layout-component">
      {router.pathname !== "/auth" && (
        <Sidebar className={showSidebar ? "open" : "closed"} itemsMenu={menu} />
      )}

      <div className="layout-component__contents">
        <NavigationBar
          leftButton={
            <ClayButtonWithIcon
              displayType="unstyled"
              symbol={showSidebar ? "product-menu-open" : "product-menu-closed"}
              onClick={toggleSidebar}
            />
          }
        />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
