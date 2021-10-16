import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import FileTreeList from "@/components/FileTree";
import { FileTree } from "@/lib/types";

import Container from "../components/Container";
import fetcher from "../lib/fetcher";

type FileTreeLayoutProps = {
  fileTree: FileTree[];
};

const FileTreeLayout: React.FC<FileTreeLayoutProps> = ({ fileTree, user }) => {
  const {
    query: { id = [] },
  } = useRouter();

  const [account, repository] = id;
  const { data: repo = {} } = useSWR(
    `https://api.github.com/repos/${account}/${repository}`,
    fetcher
  );

  const avatar_url = repo?.owner?.avatar_url;

  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-6xl tracking-tight mb-1 text-black dark:text-white">
              {user.name}
            </h1>

            <p className="mt-5 text-gray-600 dark:text-gray-400 mb-8">
              {repo?.description}
            </p>
          </div>
          {avatar_url && (
            <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt={`${account} profile image`}
                title={`${account} profile image`}
                height={176}
                width={176}
                src={avatar_url}
                className="rounded-full"
              />
            </div>
          )}
        </div>

        <FileTreeList fileTree={fileTree} />
      </div>
    </Container>
  );
};

export default FileTreeLayout;
