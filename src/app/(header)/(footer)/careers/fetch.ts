import { MediaSource } from "@components/ui/Media/types";

export type Career = {
  media: MediaSource;
  profileId: string;
  name: string;
  role: string;
};

export const fetchCareers = async (): Promise<Career[]> => {
  return await Promise.resolve(
    Array.from({ length: 12 }, () => {
      return {
        media: {
          type: "IMAGE",
          src: "/nhi_0.png",
          alt: "nhi_0",
        },
        profileId: "profileId",
        name: "name",
        role: "role",
      };
    }),
  );
};
