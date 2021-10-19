import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

type MetaProps = {
  description?: string;
  title?: string;
  type?: string;
  image?: string;
  date?: string;
};

const Meta: React.FC<MetaProps> = ({
  date,
  description = `Markdown Reader`,
  image,
  title = "MD Reader",
  type = "website",
}) => {
  const router = useRouter();
  const meta = {
    date,
    description,
    image,
    title,
    type,
  };

  const website = "https://md-reader.vercel.app";

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${website}${router.asPath}`} />
      <link rel="canonical" href={`${website}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Keven Leone" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kevenleone" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
    </Head>
  );
};

export default Meta;
