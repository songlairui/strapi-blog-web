import fetch from "isomorphic-unfetch";
import { HOST_URL } from "./constants";

export async function sampleFetchWrapper(
  input: RequestInfo,
  init?: RequestInit
) {
  try {
    const data = await fetch(input, init).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const fetcher = (key: string, init?: RequestInit) => {
  return fetch(`${HOST_URL}/api_blog${key}`, init).then(r => r.json());
};
