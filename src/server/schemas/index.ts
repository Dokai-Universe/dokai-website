import { workSchemas } from "./work";
import { aboutSchemas } from "./about";
import { careerSchemas } from "./careers";

export const commonSchemas = {
  ErrorResponse: {
    type: "object",
    required: ["message"],
    properties: { message: { type: "string" } },
    additionalProperties: false,
  },
} as const;

export const schemas = {
  ...workSchemas,
  ...aboutSchemas,
  ...commonSchemas,
  ...careerSchemas,
} as const;
