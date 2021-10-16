import React from "react";
import ReactMarkdown from "react-markdown";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import components, { MDXComponentsOptions } from "./MDXComponents";

type MarkdownProps = {
  params: MDXComponentsOptions;
  children: string;
};

const Markdown: React.FC<MarkdownProps> = ({ children, params }) => {
  const updateComponents = components(params);

  return (
    <ReactMarkdown
      components={updateComponents}
      rehypePlugins={[rehypeSlug, rehypeCodeTitles, rehypePrism]}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
