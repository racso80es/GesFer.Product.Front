import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { myCompanyApi } from "@/lib/api/my-company";
import type { UpdateCompany } from "@/lib/types/api";

export const useMyCompany = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["myCompany"],
    queryFn: () => myCompanyApi.get(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateCompany) => myCompanyApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCompany"] });
    },
  });

  return {
    company: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updateCompany: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
