import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

import components, { MDXComponentsOptions } from "./MDXComponents";

type MarkdownProps = {
  params: MDXComponentsOptions;
  children: string;
};

const Markdown: React.FC<MarkdownProps> = ({ children, params }) => {
  const updateComponents = components(params);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="w-full prose dark:prose-dark max-w-none">
      {domLoaded && (
        <ReactMarkdown
          skipHtml
          components={updateComponents}
          rehypePlugins={[
            rehypeSlug,
            remarkEmoji,
            rehypeCodeTitles,
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ["anchor"],
                },
              },
            ],
            [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
          ]}
          remarkPlugins={[remarkGfm]}
        >
          {children}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default Markdown;
