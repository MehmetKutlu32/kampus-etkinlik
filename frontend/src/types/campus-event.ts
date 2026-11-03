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

/** Formun verisi: CampusEvent gibi ama id yok; input hep metin verdiği için kontenjan string. */
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

/** Her alana en fazla bir hata mesajı. */
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
