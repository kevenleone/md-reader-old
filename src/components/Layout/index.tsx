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
      <ClayLayout.Row>
        <ClayLayout.Col xl={2}>
          <Sidebar />
        </ClayLayout.Col>
        <ClayLayout.ContainerFluid className="p-4 children-content">{children}</ClayLayout.ContainerFluid>
      </ClayLayout.Row>
    </div>
  );
};

export default Layout;
