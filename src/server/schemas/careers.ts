export const careersSchemas = {
  /** -----------------------------
   *  Atomic / Reusable
   *  ----------------------------- */

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
      value: { type: "array", items: { type: "string" } },
    },
    additionalProperties: false,
  },

  Content: {
    oneOf: [
      { $ref: "#/components/schemas/ContentText" },
      { $ref: "#/components/schemas/ContentList" },
    ],
    discriminator: {
      propertyName: "type",
      mapping: {
        TEXT: "#/components/schemas/ContentText",
        LIST: "#/components/schemas/ContentList",
      },
    },
  },

  /** -----------------------------
   *  Core Domain Schemas
   *  - Profile: DB row concept (projects excluded)
   *  - Project: DB row concept
   *  ----------------------------- */

  Profile: {
    type: "object",
    required: ["email", "avatar", "bio", "contacts", "experiences"],
    properties: {
      email: { type: "string" },
      avatar: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
      bio: { type: "string" },
      contacts: {
        type: "array",
        items: { $ref: "#/components/schemas/ContactLink" },
      },
      experiences: { type: "array", items: { type: "string" } },
    },
    additionalProperties: false,
  },

  Project: {
    type: "object",
    required: ["id", "title", "thumbnail", "contents", "medias"],
    properties: {
      id: { type: "string", description: "uuid" },
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

  /** -----------------------------
   *  View / API DTO Schemas
   *  ----------------------------- */

  ProfileListItem: {
    type: "object",
    required: ["email", "avatar"],
    properties: {
      email: { type: "string" },
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
      id: { type: "string", description: "uuid" },
      title: { type: "string" },
      thumbnail: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
    },
    additionalProperties: false,
  },

  ProfileDetail: {
    type: "object",
    required: ["email", "avatar", "bio", "contacts", "experiences", "projects"],
    properties: {
      email: { type: "string" },
      avatar: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
      bio: { type: "string" },
      contacts: {
        type: "array",
        items: { $ref: "#/components/schemas/ContactLink" },
      },
      experiences: { type: "array", items: { type: "string" } },
      projects: {
        type: "array",
        items: { $ref: "#/components/schemas/ProjectCard" },
      },
    },
    additionalProperties: false,
  },

  /** -----------------------------
   *  Response Envelopes
   *  ----------------------------- */

  ProfilesListResponse: {
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

  ProfileDetailResponse: {
    type: "object",
    required: ["data", "updatedAt"],
    properties: {
      data: { $ref: "#/components/schemas/ProfileDetail" },
      updatedAt: { type: "string", nullable: true },
    },
    additionalProperties: false,
  },

  ProjectResponse: {
    type: "object",
    required: ["data", "updatedAt"],
    properties: {
      data: { $ref: "#/components/schemas/Project" },
      updatedAt: { type: "string", nullable: true },
    },
    additionalProperties: false,
  },

  /** -----------------------------
   *  Request Bodies (Admin CUD)
   *  ----------------------------- */

  ProfileUpsertRequest: {
    type: "object",
    required: ["data"],
    properties: {
      data: {
        type: "object",
        description:
          "Profile fields only (avatar, bio, contacts, experiences). Projects are managed separately.",
        properties: {
          avatar: {
            oneOf: [
              { $ref: "#/components/schemas/MediaSource" },
              { type: "null" },
            ],
          },
          bio: { type: "string" },
          contacts: {
            type: "array",
            items: { $ref: "#/components/schemas/ContactLink" },
          },
          experiences: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },

  ProjectCreateRequest: {
    type: "object",
    required: ["data"],
    properties: {
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
      orderIndex: { type: "number" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },

  ProjectPatchRequest: {
    type: "object",
    properties: {
      data: {
        type: "object",
        description: "Partial project data (without id)",
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
      orderIndex: { type: "number" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },
} as const;
