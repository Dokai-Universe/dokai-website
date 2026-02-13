import { useQuery } from "@tanstack/react-query";
import { fetchAbout } from "./fetch";

export const queryOptions = {
  retry: 5,
  staleTime: 1000,
  suspense: true,
};

export const useAboutQuery = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => fetchAbout(),
    ...queryOptions,
    enabled: true,
  });
};
