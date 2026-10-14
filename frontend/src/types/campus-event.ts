export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // YYYY-MM-DD
  time: string; // SS:DD
  location: string;
  description: string;
  image?: string;
}
