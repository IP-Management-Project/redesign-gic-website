import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );
  }

  private responseBody<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config).then(this.responseBody);
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config).then(this.responseBody);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config).then(this.responseBody);
  }

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.patch<T>(url, data, config).then(this.responseBody);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config).then(this.responseBody);
  }
}

export const apiClient = new AxiosClient(process.env.NEXT_PUBLIC_API_BASE_URL!);
