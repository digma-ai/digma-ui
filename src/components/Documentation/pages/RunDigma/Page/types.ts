import type { ReactNode } from "react";

export interface PageContent {
  title: string;
  description?: ReactNode;
  sections?: {
    title?: string;
    number?: number;
    description?: ReactNode;
    content?: ReactNode;
  }[];
}

export type PageProps = PageContent;
