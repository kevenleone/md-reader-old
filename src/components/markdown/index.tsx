import React from "react";
import ReactMarkdown from "react-markdown";
import {
  NormalComponents,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import emoji from "remark-emoji";
import gfm from "remark-gfm";

import theme from "./theme";

const components: Partial<NormalComponents & SpecialComponents> = {
  code: ({ children, className, inline, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={theme}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function Reader({ children }) {
  return (
    <ReactMarkdown
      components={components}
      skipHtml
      remarkPlugins={[gfm, emoji]}
    >
      {children}
    </ReactMarkdown>
  );
}
