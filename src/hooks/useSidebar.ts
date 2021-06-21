import { useContext, useEffect } from "react";

import { AppContext, AppTypes } from "@/providers/AppContextProvider";

type UseSidebarProps = {
  showSidebar?: boolean;
};

type UseSidebar = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

const useSidebar = ({ showSidebar }: UseSidebarProps): UseSidebar => {
  const [{ showSidebar: showSidebarInitial }, dispatch] = useContext(
    AppContext
  );

  const toggleSidebar = () => {
    const payload = showSidebar ?? !showSidebarInitial;

    dispatch({
      payload,
      type: AppTypes.SET_SHOW_SIDEBAR,
    });

    localStorage.setItem("application-sidebar", payload ? "open" : "closed");
  };

  useEffect(() => {
    if (showSidebar !== undefined) {
      toggleSidebar();
    }
  }, [showSidebar]);

  return {
    showSidebar: showSidebarInitial,
    toggleSidebar,
  };
};

export default useSidebar;
