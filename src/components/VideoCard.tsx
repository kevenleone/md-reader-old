import { useRouter } from "next/router";
import React from "react";

type FileTreeCardProps = {
  description?: string;
  href: string;
  icon: React.ReactNode;
  index: number;
  title: string;
};

const FileTreeCard: React.FC<FileTreeCardProps> = ({
  description,
  href,
  icon,
  index,
  title,
}) => {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <a className="w-full" href={href} onClick={handleClick} aria-label={title}>
      <div className="w-full border-b border-gray-200 dark:border-gray-700 py-3 transform hover:scale-[1.01] transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-baseline">
          <div className="flex items-center">
            <div className="text-gray-300 dark:text-gray-400 text-left mr-6">
              {icon}
            </div>
            <h4 className="text-lg font-medium w-full text-gray-800 dark:text-gray-100">
              {title}
            </h4>
          </div>
          <div className="flex items-center mt-2 sm:mt-0 w-full sm:w-auto justify-between">
            {description && (
              <p className="text-gray-500 dark:text-gray-400 text-left sm:text-right w-32 md:mb-0 mr-2 ml-10 sm:ml-0">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default FileTreeCard;
