export interface PageContent {
  title: string;
  description?: string[];
  sections: { title: string; description?: string[]; code?: string }[];
}
