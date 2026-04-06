export interface ModelComparison {
  id: number;
  modelId: number;
  labId: number;
  contextInput?: string;
  output?: string;
  multimodal?: boolean;
  speed?: string;
  bestFor?: string;
  benchmarkScore?: number;
  createdAt: Date;
  updatedAt: Date;
}
