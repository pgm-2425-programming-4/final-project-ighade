// ../../api/data.js
import { API_URL, API_TOKEN } from "../../constants";

function appendFilters(query, filters, prefix = "filters") {
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      appendFilters(query, value, `${prefix}[${key}]`);
    } else {
      query.append(`${prefix}[${key}]`, value);
    }
  });
}

function appendPopulate(query, populate) {
  if (typeof populate === "string") {
    query.append("populate", populate);
  } else if (typeof populate === "object" && populate !== null) {
    Object.entries(populate).forEach(([key, value]) => {
      query.append(`populate[${key}]`, value);
    });
  }
}

export const fetchData = async (endpoint, populate = null, filters = null) => {
  const query = new URLSearchParams();

  // Handle optional populate
  if (populate) {
    appendPopulate(query, populate);
  }

  // Handle optional filters
  if (filters && typeof filters === "object") {
    appendFilters(query, filters);
  }

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
