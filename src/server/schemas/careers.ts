export const careerSchemas = {
  ContactLink: {
    type: "object",
    required: ["name", "value", "href"],
    properties: {
      name: { type: "string" },
      value: { type: "string" },
      href: { type: "string" },
    },
    additionalProperties: false,
  },

  ContentText: {
    type: "object",
    required: ["type", "name", "value"],
    properties: {
      type: { type: "string", enum: ["TEXT"] },
      name: { type: "string" },
      value: { type: "string" },
    },
    additionalProperties: false,
  },

  ContentList: {
    type: "object",
    required: ["type", "name", "value"],
    properties: {
      type: { type: "string", enum: ["LIST"] },
      name: { type: "string" },
      value: {
        type: "array",
        items: { type: "string" },
      },
    },
    additionalProperties: false,
  },

  Content: {
    oneOf: [
      { $ref: "#/components/schemas/ContentText" },
      { $ref: "#/components/schemas/ContentList" },
    ],
  },

  Profile: {
    type: "object",
    required: [
      "email",
      "name",
      "role",
      "avatar",
      "bio",
      "contacts",
      "experiences",
    ],
    properties: {
      email: { type: "string", format: "email" },
      name: { type: "string" },
      role: { type: "string" },
      avatar: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
      bio: { type: "string" },
      contacts: {
        type: "array",
        items: { $ref: "#/components/schemas/ContactLink" },
      },
      experiences: {
        type: "array",
        items: { type: "string" },
      },
    },
    additionalProperties: false,
  },

  Project: {
    type: "object",
    required: ["id", "title", "thumbnail", "contents", "medias"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      thumbnail: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
      contents: {
        type: "array",
        items: { $ref: "#/components/schemas/Content" },
      },
      medias: {
        type: "array",
        items: { $ref: "#/components/schemas/MediaSource" },
      },
    },
    additionalProperties: false,
  },

  ProfileListItem: {
    type: "object",
    required: ["email", "name", "role", "avatar"],
    properties: {
      email: { type: "string", format: "email" },
      name: { type: "string" },
      role: { type: "string" },
      avatar: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
    },
    additionalProperties: false,
  },

  ProjectCard: {
    type: "object",
    required: ["id", "title", "thumbnail"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      thumbnail: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
    },
    additionalProperties: false,
  },

  ProfileDetail: {
    allOf: [
      { $ref: "#/components/schemas/Profile" },
      {
        type: "object",
        required: ["projects"],
        properties: {
          projects: {
            type: "array",
            items: { $ref: "#/components/schemas/ProjectCard" },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  // ===== Responses =====

  CareerProfileListResponse: {
    type: "object",
    required: ["items"],
    properties: {
      items: {
        type: "array",
        items: { $ref: "#/components/schemas/ProfileListItem" },
      },
    },
    additionalProperties: false,
  },

  CareerProfileDetailResponse: {
    type: "object",
    required: ["isPublished", "data", "updatedAt"],
    properties: {
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/ProfileDetail" },
      updatedAt: { type: "string" },
    },
    additionalProperties: false,
  },

  CareerProjectDetailResponse: {
    type: "object",
    required: ["isPublished", "data", "updatedAt"],
    properties: {
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/Project" },
      updatedAt: { type: "string" },
    },
    additionalProperties: false,
  },

  // ===== Requests =====

  CareerCreateProfileRequest: {
    type: "object",
    required: ["isPublished", "data"],
    properties: {
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/Profile" },
    },
    additionalProperties: false,
  },

  CareerUpdateProfileRequest: {
    type: "object",
    properties: {
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/Profile" },
    },
    additionalProperties: false,
  },

  CareerCreateProjectRequest: {
    type: "object",
    required: ["ownerEmail", "isPublished", "data"],
    properties: {
      ownerEmail: { type: "string", format: "email" },
      isPublished: { type: "boolean" },
      data: {
        type: "object",
        required: ["title", "thumbnail", "contents", "medias"],
        properties: {
          title: { type: "string" },
          thumbnail: {
            oneOf: [
              { $ref: "#/components/schemas/MediaSource" },
              { type: "null" },
            ],
          },
          contents: {
            type: "array",
            items: { $ref: "#/components/schemas/Content" },
          },
          medias: {
            type: "array",
            items: { $ref: "#/components/schemas/MediaSource" },
          },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  },

  CareerUpdateProjectRequest: {
    type: "object",
    properties: {
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/Project" },
    },
    additionalProperties: false,
  },

  // ===== Mutation mini responses =====
  CareerEmailResponse: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" },
    },
    additionalProperties: false,
  },

  CareerIdResponse: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
} as const;
