
export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' }
];

export const ACTIVITY_LEVELS = ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'];

export const DEFAULT_PROFILE = {
  name: 'Health Seeker',
  age: 30,
  gender: 'Male' as const,
  height: 170,
  weight: 70,
  lifestyle: 'Moderate' as const,
  language: 'en',
  medicalHistorySummary: 'No significant medical history recorded.'
};

export const INITIAL_DAILY_LOGS = [
  { date: '2023-10-20', sleep: 7, water: 2, steps: 6000, mood: 'Happy', diet: 'Balanced' },
  { date: '2023-10-21', sleep: 6, water: 1.5, steps: 8000, mood: 'Neutral', diet: 'High Protein' },
  { date: '2023-10-22', sleep: 8, water: 3, steps: 12000, mood: 'Stressed', diet: 'Keto' },
  { date: '2023-10-23', sleep: 7.5, water: 2.5, steps: 9500, mood: 'Happy', diet: 'Balanced' },
];
