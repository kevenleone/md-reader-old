import ClayLayout from '@clayui/layout';
import React from 'react';

import NavigationBar from '../NavigationBar';
import Sidebar from '../Sidebar';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC = ({ children }: ILayout) => {
  return (
    <div className="layout">
      <NavigationBar />
      <Sidebar />
      <ClayLayout.ContainerFluid>
        <div className="p-4 children-content">{children}</div>
      </ClayLayout.ContainerFluid>
    </div>
  );
};

export default Layout;
