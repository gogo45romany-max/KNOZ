export enum Testament {
  OLD = "العهد القديم",
  NEW = "العهد الجديد",
  DEUTERO = "الأسفار القانونية الثانية"
}

export interface Book {
  id: string;
  name: string;
  testament: Testament;
  chapters: number;
  category: string; // e.g., Pentateuch, Gospels, Prophets
}

export enum CommentaryStyle {
  SPIRITUAL = "تأمل روحي (آبائي)",
  ANALYTICAL = "شرح تحليلي وتفسيري",
  HISTORICAL = "خلفية تاريخية وجغرافية",
  SYMBOLIC = "تفسير رمزي",
  SIMPLE = "شرح مبسط للحياة اليومية"
}

export interface VideoResource {
  title: string;
  preacher: string;
}

export interface ChapterData {
  bookName: string;
  chapterNumber: number;
  scriptureText?: string; 
  interpretation: string;
  keyVerses: string[];
  practicalApplication: string;
  videoResources?: VideoResource[];
}

export interface SearchResult {
  answer: string;
  references: string[];
}

export interface VerseOfDayData {
  verseText: string;
  reference: string;
  devotional: string;
}

export interface AgpeyaPrayerData {
  title: string;
  intro: string; // Lord's prayer, Thanksgiving, Ps 50
  psalms: { title: string; text: string }[];
  gospel: { title: string; text: string };
  litanies: string[]; // The "Qita"
  kyrie: string; // Kyrie Eleison count/text
  absolution: string; // The Analysis (Ta7lil)
  conclusion: string;
}