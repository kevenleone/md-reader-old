import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import React, { useEffect, useState } from 'react';

import { getRepositoryTree } from '../../graphql/schemas';
import { useQuery } from '../../hooks/fetch';

const markDownExt = '.md';

const getTreeIcon = (tree) => {
  return tree.extension === markDownExt ? 'document' : 'folder';
};

const isTreeOrMD = (tree) => {
  return tree.extension === markDownExt || tree.object?.entries?.some(isTreeOrMD);
};

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
  const getTreeName = (name) => (name.length > 20 ? `${name.substring(0, 20)}...md` : name);

  const RenderTrees = ({ trees: treeList }) => {
    return (
      <div>
        {treeList.map(
          (tree) =>
            isTreeOrMD(tree) && (
              <div className="markdown-item" key={tree.name}>
                <ClayButton displayType="unstyled">
                  <span className="inline-item inline-item-before">
                    <ClayIcon symbol={getTreeIcon(tree)} />
                  </span>
                  <span className="tree">{getTreeName(tree.name)}</span>
                </ClayButton>
                {tree.object?.entries?.length && <RenderTrees trees={tree.object?.entries} />}
              </div>
            ),
        )}
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="title">
        <h3>MD List</h3>
      </div>
      <div className="content">
        <RenderTrees trees={trees} />
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
