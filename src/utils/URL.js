export const API_URL = process.env.NODE_ENV === "development" ? `http://localhost:5000` : `https://mwriter-api.herokuapp.com`;
// export const API_URL = `https://mwriter-api.herokuapp.com`;
export const PROD_API_URL = `https://mwriter-api.herokuapp.com`;
// export const CLIENT_URL = process.env.NODE_ENV === "development" ? `http://127.0.0.1:3000` : `http://mwriter.herokuapp.com`
export const CLIENT_URL = process.env.NODE_ENV === "development" ? `http://127.0.0.1:3000` : `https://www.mwriter.app`;
// export const CLIENT_URL = `http://www.mwriter.app`;
// export const CLIENT_URL = `http://127.0.0.1:3000`;