// lib/sources.ts
import type { Item as RssItem } from "rss-parser";
import type { NormalizedArticle } from "@/types/article-protocol";

export type SourceConfig = {
  name: string;
  type: "rss";
  url: string;
  lang: "ko" | "en";
  /**
   * Optional per-source normalization override.
   * Merged on top of default normalizeArticle().
   */
  normalize?: (item: RssItem) => Partial<NormalizedArticle>;
};

export const SOURCES: SourceConfig[] = [
  {
    name: "Nongmin Newspaper",
    type: "rss",
    url: "https://www.nongmin.com/rss",
    lang: "ko",
  },
  {
    name: "Korea Rural Economic Institute",
    type: "rss",
    url: "https://www.krei.re.kr/rss",
    lang: "ko",
  },
  {
    name: "Korea Rural Economic Newspaper",
    type: "rss",
    url: "https://www.kenews.co.kr/rss",
    lang: "ko",
  },
  {
    name: "Korea Farmers & Fishermen Newspaper",
    type: "rss",
    url: "https://www.agrinet.co.kr/rss",
    lang: "ko",
  },
  {
    name: "Agricultural Materials Newspaper",
    type: "rss",
    url: "https://www.yongnong.co.kr/rss",
    lang: "ko",
  },
  {
    name: "Maeil Business Newspaper",
    type: "rss",
    url: "https://www.mk.co.kr/rss/30000001/",
    lang: "ko",
  },
  {
    name: "Chosun Ilbo",
    type: "rss",
    url: "https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml",
    lang: "ko",
  },
  {
    name: "Dong-A Ilbo",
    type: "rss",
    url: "https://rss.donga.com/total.xml",
    lang: "ko",
  },
];

export const SOURCE_LOGOS: Record<string, { name: string; logo: string }> = {
  "Maeil Business Newspaper": {
    name: "Maeil Business Newspaper",
    logo: "/logos/mk_logo.png", // download and store locally
  },
  "Chosun Ilbo": {
    name: "Chosun Ilbo",
    logo: "/logos/chosun_logo.png",
  },
  "Dong-A Ilbo": {
    name: "Dong-A Ilbo",
    logo: "/logos/donga_logo.png",
  },
  "Nongmin Newspaper": {
    name: "Nongmin Newspaper",
    logo: "/logos/nongmin_logo.png",
  },
  "Korea Rural Economic Institute": {
    name: "Korea Rural Economic Institute",
    logo: "/logos/krei_logo.png",
  },
  "Korea Farmers & Fishermen Newspaper": {
    name: "Korea Farmers & Fishermen Newspaper",
    logo: "/logos/agrinet_logo.png",
  },
  // "Agricultural Materials Newspaper": {
  //   name: "Agricultural Materials Newspaper",
  //   logo: "/logos/yongnong_logo.png",
  // },
};

// Optional default:
// Use if no logo is found.
export const DEFAULT_SOURCE = {
  name: "News",
  logo: "/logos/default_news.png",
};
