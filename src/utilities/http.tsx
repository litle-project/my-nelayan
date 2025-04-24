/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { redirect } from "next/navigation";

const baseURL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestBody = Record<string, any> | FormData | null;

class Http {
  async request<T = any>(
    method: HTTPMethod,
    path: string,

    body: RequestBody = null
  ): Promise<T | void> {
    const url = new URL(`${baseURL}/${path}`);

    // Add query params for GET
    if (method === "GET" && body && !(body instanceof FormData)) {
      Object.entries(body).forEach(([key, value]) => {
        if (value != null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    try {
      const token = localStorage.getItem("token");

      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (!(body instanceof FormData) && method !== "GET") {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url.toString(), {
        method,
        headers,
        body:
          method !== "GET" && body
            ? body instanceof FormData
              ? body
              : JSON.stringify(body)
            : null,
      });

      if (response.status === 401) {
        return redirect("/"); // Next.js equivalent of router.push
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Something went wrong");
      }

      for (const [key, value] of response.headers.entries()) {
        console.log(`${key}: ${value}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("HTTP Error:", error?.message || "Something went wrong");
    }
  }

  get<T = any>(path: string, query?: Record<string, any>) {
    return this.request<T>("GET", path, query);
  }

  post<T = any>(path: string, data?: RequestBody) {
    return this.request<T>("POST", path, data);
  }

  put<T = any>(path: string, data?: RequestBody) {
    return this.request<T>("PUT", path, data);
  }

  delete<T = any>(path: string) {
    return this.request<T>("DELETE", path);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Http();
