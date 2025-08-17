import { API_BASE_URL } from "../config/constants";

interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.headers = {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.headers, ...options.headers };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";

    return this.request<T>(`${endpoint}${queryString}`, {
      method: "GET",
    });
  }

  public async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  public setToken(token: string) {
    this.headers["Authorization"] = `Bearer ${token}`;
  }

  public clearToken() {
    delete this.headers["Authorization"];
  }
}

export const apiClient = new ApiClient({
  baseURL: API_BASE_URL,
});

export default apiClient;
