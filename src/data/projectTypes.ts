export type ProjectSummary = {
  slug: string;
  thumbnail: string;
  name: string;
  category: string;
  description: string;
  headline: string;
  summary: string;
  role: string;
  stack: string[];
  url?: {
    text: string;
    href: string;
  };
};

type TextSection = {
  title: string;
  paragraphs: string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectContent = {
  gallery?: ProjectImage[];
  overview: {
    introduction: TextSection;
    solution: TextSection;
    capabilities: {
      title: string;
      description: string;
    }[];
  };
};

export type Project = ProjectSummary & ProjectContent;
