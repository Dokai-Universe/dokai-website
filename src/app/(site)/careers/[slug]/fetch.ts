import { MediaSource } from "@components/ui/Media/types";
import { getRandomColor } from "@utils/Color";

const profile: Profile = {
  media: {
    type: "IMAGE",
    src: "/nhi_0.png",
    alt: "nhi_0",
  },
  introduce:
    "BUCK is always looking for dynamic, passionate, and talented artists to join our team.\nBelow is a list of our current vacancies - if you don't see anything, check back again soon. If you don't see any positions that match your skills, feel free to send an email with a link to your work.",
  contact: [
    {
      name: "Instagram",
      value: "@dokai123_",
    },
    {
      name: "Behance",
      value: "dokai123_",
    },
    {
      name: "Email",
      value: "dokai.solart@gmail.com",
    },
  ],
};

const works: Work[] = [
  {
    media: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    bgColor: getRandomColor(),
    workId: "workId",
  },
  {
    media: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    bgColor: getRandomColor(),
    workId: "workId",
  },
  {
    media: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    bgColor: getRandomColor(),
    workId: "workId",
  },
  {
    media: {
      type: "IMAGE",
      src: "/nhi_0.png",
      alt: "nhi_0",
    },
    title: "title",
    bgColor: getRandomColor(),
    workId: "workId",
  },
];

export type Profile = {
  media: MediaSource;
  introduce: string;
  contact: {
    name: string;
    value: string;
  }[];
};

export type Work = {
  media: MediaSource;
  title: string;
  bgColor: string;
  workId: string;
};

export type CareersDetail = {
  profile: Profile;
  works: Work[];
  experiences: string[];
};

export const fetchCareersDetail = async (
  profileId: string,
): Promise<CareersDetail> => {
  console.log(profileId);

  return await Promise.resolve({
    profile: profile,
    works: works,
    experiences: [
      "2020.10.12 Media art project ~",
      "2020.10.12 Media art project ~",
      "2020.10.12 Media art project ~",
      "2020.10.12 Media art project ~",
    ],
  });
};
