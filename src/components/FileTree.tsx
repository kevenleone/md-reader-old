import { StarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import React from "react";

import BreadCrumb from "@/components/BreadCrumb";
import ViewCard from "@/components/VideoCard";
import { File, Folder } from "@/icons/icons";
import { FileTree } from "@/lib/types";
import { filterFileTree } from "@/lib/util";

import FileDialog from "./files/FileDialog";
import DialogDemo from "./ui/Dialog";
import DropdownMenuDemo from "./ui/Dropdown";
import SwitchDemo from "./ui/Switch";

type FileTreeListProps = {
  fileTree: FileTree[];
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
          description={<FileDialog file={file} />}
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
