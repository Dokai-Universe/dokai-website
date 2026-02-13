import type { Profile, Project, Content, ContactLink } from "@domain/careers";
import type { MediaSource } from "@domain/media";

export type ProfileData = Omit<Profile, "email">;
export type ProjectData = Omit<Project, "id">;

export function normalizeProfileData(input: Partial<ProfileData>): ProfileData {
  return {
    avatar: (input.avatar ?? null) as MediaSource | null,
    bio: typeof input.bio === "string" ? input.bio : "",
    contacts: Array.isArray(input.contacts)
      ? (input.contacts as ContactLink[])
      : [],
    experiences: Array.isArray(input.experiences)
      ? (input.experiences as string[])
      : [],
  };
}

export function normalizeProjectData(input: Partial<ProjectData>): ProjectData {
  return {
    title: typeof input.title === "string" ? input.title : "",
    thumbnail: (input.thumbnail ?? null) as MediaSource | null,
    contents: Array.isArray(input.contents)
      ? (input.contents as Content[])
      : [],
    medias: Array.isArray(input.medias) ? (input.medias as MediaSource[]) : [],
  };
}
