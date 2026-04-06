export interface ResearchPaper {
  id: number;
  title: string;
  source: string; // e.g. "DeepSeek", "Google DeepMind"
  sourceLabel?: string; // e.g. "REASONING", "OPEN WEIGHTS"
  sourceLabelColor?: string;
  arxivId?: string;
  authors?: string;
  date: string; // ISO date string
  overview: string;
  keyFindings: string[];
  modelsReferenced: string[];
  stats?: { label: string; value: string }[];
  tags: string[];
  isOpenWeights?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
