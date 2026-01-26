import React from "react";
import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type SeoTagsProps = {
  title: string;
  description?: string;
};

const getFullTitle = (title: string) => {
  if (!title) {
    return siteConfig.name;
  }

  return `${title} - ${siteConfig.name}`;
};

export const formatSlugTitle = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const SeoTags = ({ title, description }: SeoTagsProps) => {
  const fullTitle = getFullTitle(title);
  const metaDescription = description ?? siteConfig.description;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
};

export const buildMetadata = (
  title: string,
  description?: string,
): Metadata => {
  const fullTitle = getFullTitle(title);
  const metaDescription = description ?? siteConfig.description;

  return {
    title: fullTitle,
    description: metaDescription,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
    },
  };
};
