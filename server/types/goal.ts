export interface Goal {
  _id: string;
  title: string;
  description?: string;
  milestones: number;
  completed: number;
  progress: number;
}
