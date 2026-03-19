const BASE_URL = "https://free-api-live-football-data.p.rapidapi.com";
const API_KEY = "b56e85ed54msh993584f6949e858p1d9158jsn8bbdccfcd140";
const API_HOST = "free-api-live-football-data.p.rapidapi.com";

export default class ProductData {
  constructor() {
    this.baseUrl = BASE_URL;
    this.headers = {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    };
  }

  async getData(endpoint) {
    const cacheKey = `cache_${endpoint}`;
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("Returning cached data for:", endpoint);
      return cached.data;
    }

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data, timestamp: Date.now() })
      );

      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
      throw err;
    }
  }
}