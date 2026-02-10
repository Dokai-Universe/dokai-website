import { MediaSource } from "@components/ui/Media/types";

export type SearchResult = {
  id: number;
  title: string;
  summary: string;
  href: string;
  media: MediaSource;
};

export type SearchResultResponse = {
  filter: string;
  items: SearchResult[];
};

export const fetchSearchResults = async (
  queries: string[],
): Promise<SearchResultResponse[]> => {
  console.log(queries);
  return await Promise.resolve([
    {
      filter: "ANIMATE",
      items: Array.from({ length: 12 }).map((_, i) => ({
        id: 100 + i,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        href: `/work/${100 + i}`,
        media: {
          type: "IMAGE",
          src: "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
          alt: "LGU+ ixi-O Brand Film",
        },
      })),
    },
    {
      filter: "CHARACTER",
      items: Array.from({ length: 1 }).map((_, i) => ({
        id: 200 + i,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        href: `/work/${200 + i}`,
        media: {
          type: "IMAGE",
          src: "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
          alt: "LGU+ ixi-O Brand Film",
        },
      })),
    },
    {
      filter: "FILM",
      items: Array.from({ length: 4 }).map((_, i) => ({
        id: 300 + i,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        href: `/work/${300 + i}`,
        media: {
          type: "IMAGE",
          src: "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
          alt: "LGU+ ixi-O Brand Film",
        },
      })),
    },
  ]);
};

export default fetchSearchResults;
