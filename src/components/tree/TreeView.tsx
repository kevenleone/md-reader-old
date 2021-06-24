import ClayIcon from "@clayui/icon";
import ClayLayout from "@clayui/layout";
import ClayList from "@clayui/list";
import ClaySticker from "@clayui/sticker";
import Link from "next/link";
import React from "react";

import { FileTree } from "@/types";

const allowedExtensions = [".md", ".markdown", ".txt"];

type TreeViewProps = {
  path: string;
  fileTree: FileTree[];
};

const TreeView: React.FC<TreeViewProps> = ({ path, fileTree = [] }) => {
  const items = fileTree
    .map((item, id) => ({
      id,
      path: item.path,
      symbol: item.type === "blob" ? "document" : "folder",
      title: <Link href={`/preview/${path}/${item.path}`}>{item.path}</Link>,
    }))
    .filter(({ path, symbol }) => {
      if (symbol === "document") {
        return allowedExtensions.some((extension) =>
          path.toLowerCase().endsWith(extension)
        );
      }
      return true;
    });

  return (
    <ClayLayout.ContainerFluid>
      <ClayList>
        {items.map((item) => (
          <ClayList.Item flex key={item.id}>
            <ClayList.ItemField>
              <ClaySticker displayType="secondary">
                <ClayIcon symbol={item.symbol} />
              </ClaySticker>
            </ClayList.ItemField>

            <ClayList.ItemField expand>
              <ClayList.ItemTitle>{item.title}</ClayList.ItemTitle>

              <ClayList.ItemText>
                {"This is subtitle information..."}
              </ClayList.ItemText>
            </ClayList.ItemField>

            <ClayList.ItemField>
              <ClayList.QuickActionMenu.Item
                onClick={() => alert("Clicked the cog!")}
                symbol="star-o"
              />
            </ClayList.ItemField>
          </ClayList.Item>
        ))}
      </ClayList>
    </ClayLayout.ContainerFluid>
  );
};

export default TreeView;
