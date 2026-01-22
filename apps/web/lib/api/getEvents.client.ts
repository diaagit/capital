// import axios from "axios";
// import { EventCategory, EventGenre, EventLanguage } from "../types/eventCard";

// interface GetEventsClientParams {
//   category?: EventCategory;
//   genre?: EventGenre;
//   language?: EventLanguage;
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   order?: "asc" | "desc";
//   all?: boolean;
// }

// export async function getEventsClient(params: GetEventsClientParams) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("No auth token found");
//   }

//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
//     {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data as {
//     events: any[];
//     total: number;
//     page: number | null;
//     limit: number | null;
//   };
// }