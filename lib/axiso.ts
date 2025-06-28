// lib/axios.ts
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

// Create cache adapter instance
const cache = setupCache({
  maxAge: 5 * 60 * 1000, // Cache expires in 5 minutes
  exclude: { query: false }, // Allow caching of requests with query params
});

// Create axios instance using the cache adapter
export const api = axios.create({
  adapter: cache.adapter,
});
