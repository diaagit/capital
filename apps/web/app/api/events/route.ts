// export const EventCategory = {
//   movie: "movie",
//   concert: "concert",
//   sports: "sports",
//   theatre: "theatre",
//   comedy: "comedy",
//   conference: "conference",
//   workshop: "workshop",
//   exhibition: "exhibition",
//   festival: "festival",
//   other: "other",
// } as const;

// export const EventGenre = {
//   action: "action",
//   drama: "drama",
//   comedy: "comedy",
//   romance: "romance",
//   horror: "horror",
//   thriller: "thriller",
//   sci_fi: "sci_fi",
//   fantasy: "fantasy",
//   documentary: "documentary",
//   animation: "animation",
//   classical: "classical",
//   rock: "rock",
//   pop: "pop",
//   jazz: "jazz",
//   hip_hop: "hip_hop",
//   sports_general: "sports_general",
//   other: "other",
// } as const;

// export const EventLanguage = {
//   english: "english",
//   hindi: "hindi",
//   marathi: "marathi",
//   spanish: "spanish",
//   french: "french",
//   german: "german",
//   japanese: "japanese",
//   korean: "korean",
//   chinese: "chinese",
//   tamil: "tamil",
//   telugu: "telugu",
//   multi_language: "multi_language",
// } as const;

// export type SortOrder = "asc" | "desc";
// export type EventCategory = (typeof EventCategory)[keyof typeof EventCategory];
// export type EventGenre = (typeof EventGenre)[keyof typeof EventGenre];
// export type EventLanguage = (typeof EventLanguage)[keyof typeof EventLanguage];

// export interface GetEventsParams {
//   token: string;

//   status?: string;
//   organiser?: string;
//   title?: string;
//   location?: string;

//   category?: (typeof EventCategory)[keyof typeof EventCategory];
//   genre?: (typeof EventGenre)[keyof typeof EventGenre];
//   language?: (typeof EventLanguage)[keyof typeof EventLanguage];

//   minPrice?: number;
//   maxPrice?: number;
//   isOnline?: boolean;

//   page?: number;
//   limit?: number;
//   all?: boolean;

//   sortBy?: "created_at" | "price" | string;
//   order?: SortOrder;
// }

// import "server-only";

// const API_BASE_URL = process.env.API_BASE_URL!;

// export async function getEvents(params: GetEventsParams) {
//   const {
//     token,
//     page = 1,
//     limit = 10,
//     all = false,
//     sortBy = "created_at",
//     order = "desc",
//     ...filters
//   } = params;

//   const searchParams = new URLSearchParams();

//   searchParams.set("page", String(page));
//   searchParams.set("limit", String(limit));
//   searchParams.set("all", String(all));
//   searchParams.set("sortBy", sortBy);
//   searchParams.set("order", order);

//   Object.entries(filters).forEach(([key, value]) => {
//     if (value !== undefined && value !== null) {
//       searchParams.set(key, String(value));
//     }
//   });

//   const res = await fetch(
//     `${API_BASE_URL}/events?${searchParams.toString()}`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     throw new Error(`Failed to fetch events (${res.status})`);
//   }

//   return res.json() as Promise<{
//     events: any[];
//     page: number | null;
//     limit: number | null;
//     total: number;
//   }>;
// }