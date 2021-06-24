import { createContext, useEffect, useReducer, useState } from "react";

import supabase from "@/services/supabase";
import { ActionMap } from "@/types";

export enum AppTypes {
  SET_NAVIGATION_BAR_TITLE = "SET_NAVIGATION_BAR_TITLE",
  SET_SHOW_SIDEBAR = "SET_SHOW_SIDEBAR",
}

export type ActionsPayload = {
  [AppTypes.SET_SHOW_SIDEBAR]: boolean;
  [AppTypes.SET_NAVIGATION_BAR_TITLE]: string;
};

type InitialState = {
  showSidebar: boolean;
  navigationBarTitle: string;
};

export type AppActions =
  ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

const initialState = {
  navigationBarTitle: "",
  showSidebar: true,
};

const reducer = (state: InitialState, action: AppActions): InitialState => {
  switch (action.type) {
    case AppTypes.SET_SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext<[InitialState, (param: AppActions) => void]>([
  initialState,
  null,
]);

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loaded, setLoaded] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmarks = async () => {
    const { data, error } = await supabase.from("bookmarks");

    console.log({ data });

    setBookmarks(data);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  useEffect(() => {
    const localStorageSidebar = localStorage.getItem("application-sidebar");

    if (localStorageSidebar) {
      dispatch({
        payload: localStorageSidebar === "open",
        type: AppTypes.SET_SHOW_SIDEBAR,
      });
    }

    setLoaded(true); // Enjoy this logic to open the page, whenever a sidebar state is got by localStorage
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {loaded && children}
    </AppContext.Provider>
  );
};

export { reducer, AppContext };

export default AppContextProvider;
