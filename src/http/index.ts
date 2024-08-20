import { TInputFormSchema } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

export const NEXT_PUBLIC_BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL!;
export const FASTAPI_BASE_URL: string = process.env.FASTAPI_BASE_URL!;

export const axiosRequestConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function create(data: TInputFormSchema) {
  return await axios.post("/api/vurl", data, axiosRequestConfig);
}

export async function getUrlById(id: string) {
  return await axios.get(`/api/vurl?id=${id}`, axiosRequestConfig);
}

export async function deleteUrlById(id: string) {
  return await axios.delete(`/api/vurl?id=${id}`, axiosRequestConfig);
}

export async function getAll() {
  return await axios.get("/api/get-all", axiosRequestConfig);
}

export async function createFastEmbedding(data: TInputFormSchema) {
  return await axios.post(
    `${FASTAPI_BASE_URL}/api/v1/scrape-and-vectorize`,
    data,
    axiosRequestConfig,
  );
}
