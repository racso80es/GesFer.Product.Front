import { apiClient } from "./client";
import type { Company, UpdateCompany } from "@/lib/types/api";

export const myCompanyApi = {
  get: async (): Promise<Company> => {
    return apiClient.get<Company>("/api/my-company");
  },

  update: async (data: UpdateCompany): Promise<Company> => {
    return apiClient.put<Company>("/api/my-company", data);
  },
};
