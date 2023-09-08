import qs from "qs";
import type { PayloadApiArgs, PayloadCollection } from "@/types/payload";

function apiFetch(url: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const next = {
    revalidate: 60,
    ...options.next,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    next,
  };

  return fetch(url, mergedOptions).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(
      `Error fetching from Payload API: ${res.statusText} (${res.status})}`
    );
  });
}

export async function getColl<T>(
  endpoint: string,
  query?: PayloadApiArgs
): Promise<PayloadCollection<T>> {
  const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true });
  const data = await apiFetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api${endpoint}${stringifiedQuery}`
  );
  return data;
}

export async function getGlob<T>(
  endpoint: string,
  query?: PayloadApiArgs
): Promise<T> {
  const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true });
  const data = await apiFetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals${endpoint}${stringifiedQuery}`
  );
  return data;
}
