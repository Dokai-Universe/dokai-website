import { useQuery } from "@tanstack/react-query";
import fetchSearchResults from "./fetch";

export const queryOptions = {
  retry: 5,
  staleTime: 1000,
};

export const useSearchQuery = (queries: string[]) => {
  return useQuery({
    queryKey: ["search", queries],
    queryFn: () => fetchSearchResults(queries),
    enabled: queries.length > 0,
  });
};
