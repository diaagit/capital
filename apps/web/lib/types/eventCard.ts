export const EventCategory = {
  movie: "movie",
  concert: "concert",
  sports: "sports",
  theatre: "theatre",
  comedy: "comedy",
  conference: "conference",
  workshop: "workshop",
  exhibition: "exhibition",
  festival: "festival",
  other: "other",
} as const;

export const EventGenre = {
  action: "action",
  drama: "drama",
  comedy: "comedy",
  romance: "romance",
  horror: "horror",
  thriller: "thriller",
  sci_fi: "sci_fi",
  fantasy: "fantasy",
  documentary: "documentary",
  animation: "animation",
  classical: "classical",
  rock: "rock",
  pop: "pop",
  jazz: "jazz",
  hip_hop: "hip_hop",
  sports_general: "sports_general",
  other: "other",
} as const;

export const EventLanguage = {
  english: "english",
  hindi: "hindi",
  marathi: "marathi",
  spanish: "spanish",
  french: "french",
  german: "german",
  japanese: "japanese",
  korean: "korean",
  chinese: "chinese",
  tamil: "tamil",
  telugu: "telugu",
  multi_language: "multi_language",
} as const;

export type SortOrder = "asc" | "desc";
export type EventCategory = (typeof EventCategory)[keyof typeof EventCategory];
export type EventGenre = (typeof EventGenre)[keyof typeof EventGenre];
export type EventLanguage = (typeof EventLanguage)[keyof typeof EventLanguage];