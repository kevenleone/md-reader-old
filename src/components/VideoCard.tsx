import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type FileTreeCardProps = {
  description?: string;
  href: string;
  icon: React.ReactNode;
  title: string;
};

const FileTreeCard: React.FC<FileTreeCardProps> = ({
  description,
  href,
  icon,
  title,
}) => {
  return (
    <div className="w-full">
      <div className="w-full border-b border-gray-200 dark:border-gray-700 py-3 transform hover:scale-[1.01] transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-baseline">
          <Link href={href} aria-label={title} className="flex items-center">
            <div className="text-gray-300 dark:text-gray-400 text-left mr-6">
              {icon}
            </div>
            <h4 className="text-lg font-medium w-full text-gray-800 dark:text-gray-100">
              {title}
            </h4>
          </Link>
          <div className="flex items-center mt-2 sm:mt-0 w-full sm:w-auto justify-evenly">
            {description && (
              <p className="text-gray-500 dark:text-gray-400 text-left sm:text-right w-32 md:mb-0 mr-2 ml-10 sm:ml-0">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileTreeCard;
