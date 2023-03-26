import { StarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import React from "react";

import BreadCrumb from "@/components/BreadCrumb";
import ViewCard from "@/components/VideoCard";
import { File, Folder } from "@/icons/icons";
import { FileTree } from "@/lib/types";

import DialogDemo from "./ui/Dialog";
import DropdownMenuDemo from "./ui/Dropdown";

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

  const fileTreeList = filterFileTree(fileTree);

  return (
    <>
      <BreadCrumb paths={paths as string[]} />

      <h3 className="font-bold text-2xl md:text-3xl tracking-tight mb-6 text-black dark:text-white">
        File Tree ({fileTreeList.length})
      </h3>

      {fileTreeList.map((file, index) => (
        <ViewCard
          description={
            <DialogDemo
              description={
                <span>
                  Choose where you want to save <b>{file.path}</b> on your
                  profile
                </span>
              }
              title={file.path}
            >
              OAskdoaskodasd
            </DialogDemo>
          }
          href={`/preview/${(paths as string[]).join("/")}/${file.path}`}
          icon={file.type === "blob" ? <File /> : <Folder />}
          key={index}
          title={file.path}
        />
      ))}
    </>
  );
};

export default FileTreeList;
