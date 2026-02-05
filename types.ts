
export interface Campaign {
  id: number;
  month: string;
  title: string;
  description: string;
}

export type WeekDay = 'SEGUNDA' | 'TERÇA' | 'QUARTA' | 'QUINTA';

export interface SipatmaDay {
  day: WeekDay;
  theme: string;
  color: string;
  content: string;
}
