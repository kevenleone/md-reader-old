import React from "react";
import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import theme from './theme'

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={theme} language={language} children={value} />;
  },
};

export default function Reader({ children }) {
  return (
    <ReactMarkdown renderers={renderers} plugins={[gfm, { singleTilde: true }]}>
      {children}
    </ReactMarkdown>
  );
}
