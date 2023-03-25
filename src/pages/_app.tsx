import "../styles/global.css";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  </SessionProvider>
);

export default App;
