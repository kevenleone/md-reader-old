import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

type BreadCrumbProps = {
  paths: string[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ paths = [] }) => {
  const router = useRouter();

  const activePath = paths[paths.length - 1];

  return (
    <ul className="flex">
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
              "mb-6 mr-2 dark:text-white text-md hidden md:block"
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
  );
};

export default BreadCrumb;
