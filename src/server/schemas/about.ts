export const aboutSchemas = {
  AboutGroup: {
    type: "object",
    required: ["name", "values"],
    properties: {
      name: { type: "string" },
      values: { type: "array", items: { type: "string" } },
    },
    additionalProperties: false,
  },

  AboutCard: {
    type: "object",
    required: ["title", "text", "icon"],
    properties: {
      title: { type: "string" },
      text: { type: "string" },
      icon: { type: "string" },
    },
    additionalProperties: false,
  },

  AboutTeam: {
    type: "object",
    required: ["role", "names"],
    properties: {
      role: { type: "string" },
      names: { type: "array", items: { type: "string" } },
    },
    additionalProperties: false,
  },

  AboutSection: {
    oneOf: [
      {
        type: "object",
        required: ["contentType", "text"],
        properties: {
          contentType: { type: "string", enum: ["TEXT"] },
          text: { type: "string" },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["name", "text", "contentType", "content"],
        properties: {
          contentType: { type: "string", enum: ["GROUP"] },
          text: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/components/schemas/AboutGroup" },
          },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["text", "contentType", "content"],
        properties: {
          contentType: { type: "string", enum: ["CARD"] },
          text: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/components/schemas/AboutCard" },
          },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["text", "contentType", "content"],
        properties: {
          contentType: { type: "string", enum: ["TEAM"] },
          text: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/components/schemas/AboutTeam" },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  AboutContent: {
    oneOf: [
      {
        type: "object",
        required: ["type", "align", "medias"],
        properties: {
          type: { type: "string", enum: ["MEDIAS"] },
          align: { type: "string", enum: ["LEFT", "RIGHT"] },
          medias: {
            type: "array",
            items: { $ref: "#/components/schemas/MediaSource" },
          },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "name", "text"],
        properties: {
          type: { type: "string", enum: ["TEXT"] },
          name: { type: "string" },
          text: { type: "string" },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "name", "text", "content"],
        properties: {
          type: { type: "string", enum: ["GROUP"] },
          name: { type: "string" },
          text: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/components/schemas/AboutGroup" },
          },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "name", "text", "content"],
        properties: {
          type: { type: "string", enum: ["CARD"] },
          name: { type: "string" },
          text: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/components/schemas/AboutCard" },
          },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "name", "text", "content"],
        properties: {
          type: { type: "string", enum: ["TEAM"] },
          name: { type: "string" },
          text: { type: "string" },
          content: {
            type: "array",
            items: { $ref: "#/components/schemas/AboutTeam" },
          },
        },
        additionalProperties: false,
      },
      {
        type: "object",
        required: ["type", "name", "value"],
        properties: {
          type: { type: "string", enum: ["SECTION"] },
          name: { type: "string" },
          value: { $ref: "#/components/schemas/AboutSection" },
        },
        additionalProperties: false,
      },
    ],
    discriminator: { propertyName: "type" },
  },

  About: {
    type: "object",
    required: ["intro", "contents"],
    properties: {
      intro: { type: "string" },
      contents: {
        type: "array",
        items: { $ref: "#/components/schemas/AboutContent" },
      },
    },
    additionalProperties: false,
  },

  AboutPageResponse: {
    type: "object",
    required: ["data", "updatedAt"],
    properties: {
      data: { $ref: "#/components/schemas/About" },
      updatedAt: { type: "string", nullable: true },
    },
    additionalProperties: false,
  },

  AboutPageUpsertRequest: {
    type: "object",
    required: ["data"],
    properties: {
      data: { $ref: "#/components/schemas/About" },
      isPublished: { type: "boolean" },
    },
    additionalProperties: false,
  },
} as const;
