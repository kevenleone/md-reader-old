import React from "react";

import Footer from "@/components/Footer";

import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Header />

      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
      >
        {children}

        <Footer />
      </main>
    </div>
  );
};

export default Layout;
