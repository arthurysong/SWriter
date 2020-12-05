export const API_URL = process.env.NODE_ENV === "development" ? `http://localhost:5000` : `https://mwriter-api.herokuapp.com`;
export const PROD_API_URL = `https://mwriter-api.herokuapp.com`;
export const CLIENT_URL = process.env.NODE_ENV === "development" ? `http://127.0.0.1:3000` : `https://mwriter.herokuapp.com`