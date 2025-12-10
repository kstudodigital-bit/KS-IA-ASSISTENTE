export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string
  timestamp: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export enum Tab {
  HOME = 'HOME',
  CHAT = 'CHAT',
  RESOURCES = 'RESOURCES',
  PROFILE = 'PROFILE'
}