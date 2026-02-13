export const workSchemas = {
  WorkCategory: {
    type: "string",
    enum: [
      "ANIMATE",
      "BRANDING",
      "CHARACTER",
      "AWARD",
      "FILM",
      "COMMERCIAL",
      "SOCIAL_CONTENTS",
    ],
  },

  LoopConfig: {
    type: "object",
    properties: {
      start: { type: "number" },
      end: { type: "number" },
    },
    additionalProperties: false,
  },

  MediaSource: {
    oneOf: [
      {
        type: "object",
        required: ["type", "src", "alt"],
        properties: {
          type: { type: "string", enum: ["IMAGE"] },
          src: { type: "string" },
          alt: { type: "string" },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "src", "alt"],
        properties: {
          type: { type: "string", enum: ["VIDEO"] },
          src: { type: "string" },
          alt: { type: "string" },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "src", "alt"],
        properties: {
          type: { type: "string", enum: ["LOOP"] },
          src: { type: "string" },
          alt: { type: "string" },
          loop: { $ref: "#/components/schemas/LoopConfig" },
        },
        additionalProperties: false,
      },
    ],
  },

  WorkMetaField: {
    type: "object",
    required: ["name", "value"],
    properties: {
      name: { type: "string" },
      value: { type: "string" },
    },
    additionalProperties: false,
  },

  CreditMember: {
    type: "object",
    required: ["role", "names"],
    properties: {
      role: { type: "string" },
      names: { type: "array", items: { type: "string" } },
    },
    additionalProperties: false,
  },

  Credit: {
    type: "object",
    required: ["team", "members"],
    properties: {
      team: { type: "string" },
      members: {
        type: "array",
        items: { $ref: "#/components/schemas/CreditMember" },
      },
    },
    additionalProperties: false,
  },

  Work: {
    type: "object",
    required: [
      "title",
      "media",
      "summary",
      "category",
      "publishedAt",
      "productionType",
      "meta",
      "keyVisuals",
      "credits",
    ],
    properties: {
      title: { type: "string" },
      media: { $ref: "#/components/schemas/MediaSource" },
      summary: { type: "string" },
      category: { $ref: "#/components/schemas/WorkCategory" },
      publishedAt: { type: "string", description: "YYYY-MM-DD or ISO string" },
      productionType: { type: "string" },
      meta: {
        type: "array",
        items: { $ref: "#/components/schemas/WorkMetaField" },
      },
      keyVisuals: {
        type: "array",
        items: { $ref: "#/components/schemas/MediaSource" },
      },
      credits: {
        type: "array",
        items: { $ref: "#/components/schemas/Credit" },
      },
    },
    additionalProperties: false,
  },

  WorkCard: {
    type: "object",
    required: [
      "id",
      "slug",
      "title",
      "summary",
      "category",
      "publishedAt",
      "productionType",
      "media",
      "isPublished",
    ],
    properties: {
      id: { type: "string" },
      slug: { type: "string" },
      title: { type: "string" },
      summary: { type: "string" },
      category: { $ref: "#/components/schemas/WorkCategory" },
      publishedAt: { type: "string" },
      productionType: { type: "string" },
      media: { $ref: "#/components/schemas/MediaSource" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },

  WorkListResponse: {
    type: "object",
    required: ["items"],
    properties: {
      items: {
        type: "array",
        items: { $ref: "#/components/schemas/WorkCard" },
      },
      nextCursor: { type: "string", nullable: true },
    },
    additionalProperties: false,
  },

  WorkDetailResponse: {
    type: "object",
    required: ["id", "slug", "data", "isPublished", "createdAt", "updatedAt"],
    properties: {
      id: { type: "string" },
      slug: { type: "string" },
      data: { $ref: "#/components/schemas/Work" },
      isPublished: { type: "boolean" },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
    additionalProperties: false,
  },

  WorkCreateRequest: {
    type: "object",
    required: ["slug", "data"],
    properties: {
      slug: { type: "string" },
      data: { $ref: "#/components/schemas/Work" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },

  WorkPatch: {
    type: "object",
    properties: {
      title: { type: "string" },
      media: { $ref: "#/components/schemas/MediaSource" },
      summary: { type: "string" },
      category: { $ref: "#/components/schemas/WorkCategory" },
      publishedAt: { type: "string" },
      productionType: { type: "string" },
      meta: {
        type: "array",
        items: { $ref: "#/components/schemas/WorkMetaField" },
      },
      keyVisuals: {
        type: "array",
        items: { $ref: "#/components/schemas/MediaSource" },
      },
      credits: {
        type: "array",
        items: { $ref: "#/components/schemas/Credit" },
      },
    },
    additionalProperties: false,
  },

  WorkUpdateRequest: {
    type: "object",
    properties: {
      data: { $ref: "#/components/schemas/WorkPatch" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },
} as const;
