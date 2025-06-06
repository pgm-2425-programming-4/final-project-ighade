// ../../api/data.js
import { API_URL, API_TOKEN } from "../../constants";

export const fetchData = async (endpoint, populate = null) => {
  const query = new URLSearchParams();

  // Handle optional populate
  if (populate) {
    if (typeof populate === "string") {
      query.append("populate", populate);
    } else if (typeof populate === "object") {
      Object.entries(populate).forEach(([key, value]) => {
        query.append(`populate[${key}]`, value);
      });
    }
  }
  console.log(API_URL)
  console.log(endpoint)
  console.log(query.toString())
  console.log(API_TOKEN)
  const url = `${API_URL}${endpoint}?${query.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);

    const data = await res.json();
    return data;
   
};
