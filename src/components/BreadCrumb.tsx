import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { ArrowLeft } from "@/icons/icons";

type BreadCrumbProps = {
  paths: string[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ paths = [] }) => {
  const router = useRouter();

  const activePath = paths[paths.length - 1];

  return (
    <>
      <span
        onClick={() => router.back()}
        className="cursor-pointer   flex h-6  items-center leading-7 my-4 rounded-lg transition-all"
      >
        <ArrowLeft />
        <span className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ml-2 text-gray-600 text-lg">
          Click to Back
        </span>
      </span>
      <ul className="hidden sm:flex">
        {(paths as string[]).map((path, index) => {
          const position = index + 1;
          const firstIndex = position === 1;
          const lastIndex = position === paths.length;
          const isActivePath = path === activePath;
          const href = `/preview/${[...paths].splice(0, index + 1).join("/")}`;
          const route = `${path} ${position !== paths.length ? "/" : ""}`;

          const handleClick = (event) => {
            event.preventDefault();
            router.push(href);
          };

          return (
            <li
              className={classNames(
                {
                  "font-bold text-gray-900": isActivePath,
                },
                { "text-gray-600": !isActivePath },
                "mb-6 mr-2 dark:text-white text-sm "
              )}
              key={index}
            >
              {firstIndex || lastIndex ? (
                route
              ) : (
                <a href={href} onClick={handleClick}>
                  {route}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BreadCrumb;
