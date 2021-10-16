import { useRouter } from "next/router";
import React from "react";

import BreadCrumb from "@/components/BreadCrumb";
import ViewCard from "@/components/VideoCard";
import { File, Folder } from "@/icons/icons";
import { FileTree } from "@/lib/types";

type FileTreeListProps = {
  fileTree: FileTree[];
};

const allowedExtensions = [".md", ".markdown", ".txt"];

const filterFileTree = (fileTree: FileTree[]) => {
  const fileType = (type) => (type === "blob" ? "z" : "a");

  return fileTree
    .filter(({ path, type }) => {
      if (type === "blob") {
        return allowedExtensions.some((extension) =>
          path.toLowerCase().endsWith(extension)
        );
      }

      return true;
    })
    .sort((a, b) => fileType(a.type).localeCompare(fileType(b.type)));
};

const FileTreeList: React.FC<FileTreeListProps> = ({ fileTree = [] }) => {
  const {
    query: { id: paths = [] },
  } = useRouter();

  return (
    <>
      <BreadCrumb />

      <h3 className="font-bold text-2xl md:text-3xl tracking-tight mb-6 text-black dark:text-white">
        File Tree
      </h3>

      {filterFileTree(fileTree).map((file, index) => (
        <ViewCard
          href={`/preview/${(paths as string[]).join("/")}/${file.path}`}
          icon={file.type === "blob" ? <File /> : <Folder />}
          index={index + 1}
          key={index}
          title={file.path}
        />
      ))}
    </>
  );
};

export default FileTreeList;
