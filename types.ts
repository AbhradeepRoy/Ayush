
export type Gender = 'Male' | 'Female' | 'Other';
export type ActivityLevel = 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  lifestyle: ActivityLevel;
  language: string;
  medicalHistorySummary: string; // The "compressed" profile
}

export interface DailyLog {
  date: string;
  sleep: number; // hours
  water: number; // liters
  steps: number;
  mood: 'Happy' | 'Neutral' | 'Sad' | 'Stressed' | 'Tired';
  diet: string;
  symptoms?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface HealthState {
  profile: UserProfile;
  dailyLogs: DailyLog[];
  messages: ChatMessage[];
  theme: 'light' | 'dark';
}
