import "@clayui/css/lib/css/atlas.css";
import "../styles/main.scss";

import { ClayIconSpriteContext } from "@clayui/icon";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

import ApplicationLayout from "@/components/layout";
import AppContextProvider from "@/providers/AppContextProvider";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <div id="application-root">
    <ClayIconSpriteContext.Provider value="/spritemap.svg">
      <AppContextProvider>
        <Provider session={pageProps.session}>
          <ApplicationLayout>
            <Component {...pageProps} />
          </ApplicationLayout>
        </Provider>
      </AppContextProvider>
    </ClayIconSpriteContext.Provider>
  </div>
);

export default MyApp;
