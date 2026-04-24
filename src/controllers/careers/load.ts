// src/controllers/careers/load.ts
import { createSupabaseServerClient } from "@lib/supabase/server";
import type { ProfileDetailResponse, ProfileListResponse } from "./types";
import { decodeEmailParam } from "@utils/Email";

// Load profile list
export const loadProfileList =
  async (): Promise<ProfileListResponse | null> => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("career_profiles")
      .select("email, data->name, data->role, data->avatar, is_published")
      .order("updated_at", { ascending: false });

    if (error) return null;

    const items =
      data?.map((row) => ({
        name: row.name ?? "",
        role: row.role ?? "",
        email: row.email as string,
        avatar: row.avatar ?? null,
      })) ?? [];

    return { items: items } as ProfileListResponse;
  };

// Load profile detail by email
export const loadProfileDetail = async (
  email: string,
): Promise<ProfileDetailResponse | null> => {
  const targetEmail = decodeEmailParam(email);

  const supabase = await createSupabaseServerClient();

  const { data: profile, error: pErr } = await supabase
    .from("career_profiles")
    .select("id, email, data, is_published, updated_at")
    .eq("email", targetEmail)
    .maybeSingle();

  if (pErr) return null;
  if (!profile) return null;

  const { data: projects, error: prErr } = await supabase
    .from("career_projects")
    .select("id, data->title, data->thumbnail, is_published")
    .eq("owner_email", targetEmail)
    .order("updated_at", { ascending: false });

  if (prErr) return null;

  return {
    id: profile.id,
    isPublished: !!profile.is_published,
    data: {
      ...profile.data,
      projects:
        projects.map((p) => ({
          id: p.id,
          title: p.title ?? "",
          thumbnail: p.thumbnail ?? null,
        })) ?? [],
    },
    updatedAt: profile.updated_at,
  } as ProfileDetailResponse;
};

// export const loadProjectDetail
