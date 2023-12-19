import axios from "axios";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
