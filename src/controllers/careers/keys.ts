export const careersQueryKeys = {
  all: () => ["careers"] as const,
  careerPageDetail: () => ["page-detail", "careers"] as const,
  profileList: () => ["careers", "profile-list"] as const,
  allByEmail: (email: string) => ["careers", email] as const,
  profileDetail: (email: string) =>
    ["careers", email, "profile-detail"] as const,
  profileExist: (email: string) => ["careers", email, "profile-exist"] as const,
  projectDetail: (projectId: string) =>
    ["careers", "project-detail", projectId] as const,
};

export const careersMutationKeys = {
  careerPageUpdate: () => ["careers-page", "career-page-update"] as const,
  createProfile: () => ["careers", "create-profile"] as const,
  updateProfile: () => ["careers", "update-profile"] as const,
  deleteProfile: () => ["careers", "delete-profile"] as const,
  createProject: () => ["careers", "create-project"] as const,
  updateProject: () => ["careers", "update-project"] as const,
  deleteProject: () => ["careers", "delete-project"] as const,
};
