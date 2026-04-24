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
    required: ["name", "values"],
    properties: {
      name: { type: "string" },
      values: {
        type: "array",
        items: { type: "string" },
      },
    },
    additionalProperties: false,
  },

  CreditMember: {
    type: "object",
    required: ["role", "names"],
    properties: {
      role: { type: "string" },
      names: {
        type: "array",
        items: { type: "string" },
      },
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
      "thumbnail",
      "summary",
      "category",
      "publishedAt",
      "productionType",
      "meta",
      "mainMedia",
      "keyVisuals",
      "credits",
    ],
    properties: {
      title: { type: "string" },
      thumbnail: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
      summary: { type: "string" },
      category: { $ref: "#/components/schemas/WorkCategory" },
      publishedAt: {
        type: "string",
        description:
          "Release date of the work (domain field). ISO string recommended.",
      },
      productionType: { type: "string" },
      meta: {
        type: "array",
        items: { $ref: "#/components/schemas/WorkMetaField" },
      },
      mainMedia: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
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

  // API에서 list item으로 내려주는 카드 형태
  WorkCard: {
    type: "object",
    required: [
      "id",
      "slug",
      "title",
      "thumbnail",
      "summary",
      "category",
      "fixedAt",
      "isPublished",
    ],
    properties: {
      id: { type: "string", format: "uuid" },
      slug: { type: "string" },
      title: { type: "string" },
      thumbnail: {
        oneOf: [{ $ref: "#/components/schemas/MediaSource" }, { type: "null" }],
      },
      summary: { type: "string" },
      category: { $ref: "#/components/schemas/WorkCategory" },
      fixedAt: {
        oneOf: [{ type: "string" }, { type: "null" }],
      },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },

  WorkListResponse: {
    type: "object",
    required: ["items", "page", "pageSize", "total", "hasNext"],
    properties: {
      items: {
        type: "array",
        items: { $ref: "#/components/schemas/WorkCard" },
      },
      page: { type: "integer", minimum: 1 },
      pageSize: { type: "integer", minimum: 1, maximum: 100 },
      total: { type: "integer", minimum: 0 },
      hasNext: { type: "boolean" },
    },
    additionalProperties: false,
  },

  WorkDetailResponse: {
    type: "object",
    required: ["id", "slug", "isPublished", "data", "updatedAt"],
    properties: {
      id: { type: "string", format: "uuid" },
      slug: { type: "string" },
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/Work" },
      updatedAt: { type: "string" },
    },
    additionalProperties: false,
  },

  // Admin create/update payload
  WorkUpsertRequest: {
    type: "object",
    required: ["slug", "isPublished", "data"],
    properties: {
      slug: { type: "string" },
      isPublished: { type: "boolean" },
      data: { $ref: "#/components/schemas/Work" },
      fixedAt: {
        oneOf: [{ type: "string" }, { type: "null" }],
        description:
          "Optional override for fixedAt (usually null unless pinning).",
      },
    },
    additionalProperties: false,
  },

  TogglePublishResponse: {
    type: "object",
    required: ["id", "isPublished"],
    properties: {
      id: { type: "string", format: "uuid" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },

  FixWorkResponse: {
    type: "object",
    required: ["id", "fixedAt"],
    properties: {
      id: { type: "string", format: "uuid" },
      fixedAt: {
        oneOf: [{ type: "string" }, { type: "null" }],
      },
    },
    additionalProperties: false,
  },
} as const;
