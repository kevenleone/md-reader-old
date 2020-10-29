import React, { useEffect, useState } from 'react';

import { getRepositoryTree } from '../../graphql/schemas';
import { useQuery } from '../../hooks/fetch';

const Sidebar = () => {
  const [trees, setTrees] = useState([]);

  const getTrees = async () => {
    const { data } = await useQuery(getRepositoryTree);
    const entries = data.data.repository?.defaultBranchRef?.target?.tree?.entries;
    setTrees(entries);
    console.log(entries);
  };

  useEffect(() => {
    getTrees();
  }, []);

  console.log({ trees });

  return (
    <div className="sidebar">
      <div className="content">
        <h3>MD List</h3>
        <ul>
          {trees.map((tree) => (
            <li key={tree.name}>{tree.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
