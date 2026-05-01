import { renderHook, waitFor } from "@testing-library/react";
import { useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMyCompany } from "./use-my-company";
import { myCompanyApi } from "@/lib/api/my-company";
import React from "react";
import type { UpdateCompany } from "@/lib/types/api";

jest.mock("@/lib/api/my-company", () => ({
  myCompanyApi: {
    get: jest.fn(),
    update: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMyCompany", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("debe cargar los datos de company", async () => {
    const mockCompany = { id: "1", businessName: "Test Company", comercialName: "Test" };
    (myCompanyApi.get as jest.Mock).mockResolvedValue(mockCompany);

    const { result } = renderHook(() => useMyCompany(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.company).toEqual(mockCompany);
    expect(myCompanyApi.get).toHaveBeenCalledTimes(1);
  });

  it("debe actualizar company y refetch", async () => {
    const mockCompany = { id: "1", businessName: "Updated Company" };
    (myCompanyApi.update as jest.Mock).mockResolvedValue(mockCompany);

    const { result } = renderHook(() => useMyCompany(), { wrapper });

    await result.current.updateCompany({ businessName: "Updated Company" } as unknown as UpdateCompany);

    expect(myCompanyApi.update).toHaveBeenCalledWith({ businessName: "Updated Company" });
  });
});
