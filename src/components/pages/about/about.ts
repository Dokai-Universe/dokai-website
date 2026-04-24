import z from "zod";

// 기존처럼 MediaSource를 아직 엄격하게 검증 못하면 unknown 유지
const mediaSourceSchema = z.unknown();

/** ===== Leaf schemas ===== */

export const aboutGroupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  values: z
    .array(z.string().trim().min(1, "Value is required"))
    .min(1, "At least one value is required"),
});

export const aboutCardSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  text: z.string().trim().min(1, "Text is required"),
  icon: z.string().trim().min(1, "Icon is required"), // 키 or URL
});

export const aboutTeamSchema = z.object({
  role: z.string().trim().min(1, "Role is required"),
  names: z
    .array(z.string().trim().min(1, "Name is required"))
    .min(1, "At least one name is required"),
});

/** ===== Content schemas (discriminated) ===== */

export const aboutContentTextSchema = z.object({
  type: z.literal("TEXT"),
  name: z.string().trim().min(1, "Name is required"),
  text: z.string().trim().min(1, "Text is required"),
});

export const aboutContentGroupSchema = z.object({
  type: z.literal("GROUP"),
  name: z.string().trim().min(1, "Name is required"),
  text: z.string().trim().min(1, "Text is required"),
  content: z.array(aboutGroupSchema).min(1, "At least one group is required"),
});

export const aboutContentCardSchema = z.object({
  type: z.literal("CARD"),
  name: z.string().trim().min(1, "Name is required"),
  text: z.string().trim().min(1, "Text is required"),
  content: z.array(aboutCardSchema).min(1, "At least one card is required"),
});

const imageFileSchema = z
  .instanceof(File)
  .refine((f) => f.size > 0, "File is invalid")
  .refine((f) => f.type.startsWith("image/"), "Only image files are allowed");

export const aboutCardFormSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    text: z.string().trim().min(1, "Text is required"),
    icon: z.string().trim(),
    iconFile: imageFileSchema.nullable().optional(),
  })
  .superRefine((val, ctx) => {
    const hasUrl = val.icon.trim().length > 0;
    const hasFile = !!val.iconFile;

    if (!hasUrl && !hasFile) {
      ctx.addIssue({
        code: "custom",
        path: ["icon"],
        message: "Icon URL or file is required",
      });
    }
  });
export const aboutContentTeamSchema = z.object({
  type: z.literal("TEAM"),
  name: z.string().trim().min(1, "Name is required"),
  text: z.string().trim().min(1, "Text is required"),
  content: z
    .array(aboutTeamSchema)
    .min(1, "At least one team item is required"),
});

export const aboutContentMediasSchema = z.object({
  type: z.literal("MEDIAS"),
  align: z.enum(["LEFT", "RIGHT"]).default("LEFT"),
  size: z.enum(["NORMAL", "FULL"]).default("NORMAL"),
  name: z.string().trim(),
  medias: z.array(mediaSourceSchema).min(1, "At least one media is required"),
});

// ✅ AboutContent
export const aboutContentSchema = z.discriminatedUnion("type", [
  aboutContentTextSchema,
  aboutContentGroupSchema,
  aboutContentCardSchema,
  aboutContentTeamSchema,
  aboutContentMediasSchema,
]);

/** ===== Root About schema ===== */

export const aboutSchema = z.object({
  intro: z.string().trim().min(1, "Intro is required"),
  contents: z.array(aboutContentSchema),
});

export type AboutInput = z.input<typeof aboutSchema>;
export type AboutOutput = z.output<typeof aboutSchema>;

/** ===== Initial ===== */

export const initialAbout: AboutInput = {
  intro: "",
  contents: [],
};
