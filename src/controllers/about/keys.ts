export const aboutQueryKeys = {
  aboutDetail: () => ["page-detail", "about"] as const,
};

export const aboutMutationKeys = {
  updateAbout: () => ["about", "update-about"] as const,
  deleteAbout: () => ["about", "delete-about"] as const,
};
