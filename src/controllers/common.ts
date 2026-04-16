import {
  InfiniteData,
  keepPreviousData,
  MutationKey,
  QueryClient,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const queryOptions = {
  retry: 1,
  staleTime: 1000,
  suspense: false,
};

type FetchApiOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export class ApiError extends Error {
  status: number;
  method: string;
  path: string;
  userMessage?: string;

  constructor(args: {
    status: number;
    method: string;
    path: string;
    userMessage?: string;
  }) {
    const { status, method, path, userMessage } = args;
    super(
      `${method} ${path} failed: ${status}${userMessage ? ` - ${userMessage}` : ""}`,
    );
    this.name = "ApiError";
    this.status = status;
    this.method = method;
    this.path = path;
    this.userMessage = userMessage;
  }
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const ct = res.headers.get("content-type") ?? "";

    if (ct.includes("application/json")) {
      const data = await res.json().catch(() => null);

      // 가장 흔한 케이스: { message: string }
      if (data && typeof data === "object") {
        const msg = data.message ?? data.error ?? data.detail ?? data.msg;

        if (typeof msg === "string") return msg;

        // message가 object/array라면 보기 좋게
        return JSON.stringify(data);
      }

      // json이지만 object가 아닐 때(문자열/숫자 등)
      if (typeof data === "string") return data;
      return JSON.stringify(data);
    }

    // text/html 등
    const text = await res.text();
    return text || "";
  } catch {
    return "";
  }
}

export async function fetchApi<TResponse = unknown, TBody = unknown>(
  path: string,
  opts: FetchApiOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers, cache } = opts;

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    cache: cache ?? "no-store",
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const msg = await readErrorMessage(res);

    throw new ApiError({
      status: res.status,
      method,
      path,
      userMessage: msg || undefined,
    });
  }

  if (res.status === 204) return undefined as TResponse;

  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) return (await res.json()) as TResponse;
  return (await res.text()) as unknown as TResponse;
}

//

export type QueryDef<TData, TKey extends QueryKey = QueryKey> = {
  queryKey: TKey;
  queryFn: () => Promise<TData>;
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
};

export const withDefaults = <TData, TKey extends QueryKey>(
  def: QueryDef<TData, TKey>,
): QueryDef<TData, TKey> => ({
  staleTime: 30_000,
  gcTime: 5 * 60_000,
  retry: 2,
  ...def,
});

export async function prefetchAppQuery<TData, TKey extends QueryKey>(
  qc: QueryClient,
  def: QueryDef<TData, TKey>,
) {
  const d = withDefaults(def);
  return qc.prefetchQuery({
    queryKey: d.queryKey,
    queryFn: d.queryFn,
    staleTime: d.staleTime,
    gcTime: d.gcTime,
    retry: d.retry,
  });
}

export function useAppQuery<TData, TKey extends readonly unknown[]>(
  def: QueryDef<TData, TKey>,
  opts?: Omit<
    UseQueryOptions<TData, unknown, TData, TKey>,
    "queryKey" | "queryFn"
  >,
) {
  const d = withDefaults(def);

  return useQuery({
    queryKey: d.queryKey,
    queryFn: d.queryFn,
    staleTime: d.staleTime,
    gcTime: d.gcTime,
    retry: d.retry,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...(opts ?? {}),
  });
}

export type InfiniteQueryDef<
  TPageData extends { nextPage?: number | null },
  TKey extends QueryKey = QueryKey,
> = {
  queryKey: TKey;
  queryFn: (ctx: { pageParam: number }) => Promise<TPageData>;
  initialPageParam?: number;
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
};

export const withInfiniteDefaults = <
  TPageData extends { nextPage?: number | null },
  TKey extends QueryKey,
>(
  def: InfiniteQueryDef<TPageData, TKey>,
): InfiniteQueryDef<TPageData, TKey> => ({
  staleTime: 5_000,
  gcTime: 5 * 60_000,
  retry: 2,
  initialPageParam: 1,
  ...def,
});

export function useAppInfiniteQuery<
  TPageData extends { nextPage?: number | null },
  TKey extends QueryKey = QueryKey,
>(
  def: InfiniteQueryDef<TPageData, TKey>,
  opts?: Omit<
    UseInfiniteQueryOptions<
      TPageData,
      unknown,
      InfiniteData<TPageData, number>,
      TKey,
      number
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) {
  const d = withInfiniteDefaults(def);

  return useInfiniteQuery({
    queryKey: d.queryKey,
    initialPageParam: d.initialPageParam ?? 1,
    queryFn: ({ pageParam }: QueryFunctionContext<TKey, number>) =>
      d.queryFn({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    staleTime: d.staleTime,
    gcTime: d.gcTime,
    retry: d.retry,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    ...opts,
  });
}

export type MutationDef<
  TData,
  TVariables = void,
  TKey extends MutationKey = MutationKey,
> = {
  invalidateQueryKeys?: (readonly string[])[];
  mutationKey?: TKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  retry?: number | boolean;
};

export const withMutationDefaults = <
  TData,
  TVariables,
  TKey extends MutationKey,
>(
  def: MutationDef<TData, TVariables, TKey>,
): MutationDef<TData, TVariables, TKey> => ({
  retry: 0, // 보통 mutation은 기본 retry를 꺼두는 걸 추천
  ...def,
});

export function useAppMutation<
  TData,
  TVariables = void,
  TKey extends MutationKey = MutationKey,
  TContext = unknown,
>(
  def: MutationDef<TData, TVariables, TKey>,
  opts?: Omit<
    UseMutationOptions<TData, unknown, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >,
) {
  const d = withMutationDefaults(def);
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables, TContext>({
    mutationKey: d.mutationKey,
    mutationFn: d.mutationFn,
    retry: d.retry,
    ...(opts ?? {}),
    onSuccess: async () => {
      if (!d.invalidateQueryKeys) return;
      console.log(123333);

      for (const key of d.invalidateQueryKeys) {
        await queryClient.invalidateQueries({ queryKey: key });
        await queryClient.refetchQueries({ queryKey: key, type: "all" });
      }
    },
  });
}
