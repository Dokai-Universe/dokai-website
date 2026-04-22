import z from "zod";

export const NewsCategoryList = ["NEWS", "BRANDING"] as const;

const mediaSourceSchema = z.unknown();

export const newsCategorySchema = z.enum(NewsCategoryList);

export const newsChapterContentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("TEXT"),
    text: z.string().min(1, "Text is required"),
  }),
  z.object({
    type: z.literal("MEDIA"),
    media: mediaSourceSchema.nullable().refine((v) => !!v, "Media is required"),
  }),
]);

export const newsChapterSchema = z.object({
  title: z.string().min(1, "Chapter title is required"),
  contents: z
    .array(newsChapterContentSchema)
    .min(1, "At least one content is required")
    .refine(
      (contents) =>
        contents.every((content) => {
          if (content.type === "TEXT") {
            return content.text.trim().length > 0;
          }

          if (content.type === "MEDIA") {
            return !!content.media;
          }

          return false;
        }),
      "Invalid chapter contents",
    ),
});

export const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: mediaSourceSchema
    .nullable()
    .refine((v) => !!v, "Thumbnail is required"),
  category: newsCategorySchema,
  summary: z.string().min(1, "Summary is required"),
  publishedAt: z.date({
    error: "Published date is required",
  }),
  chapters: z
    .array(newsChapterSchema)
    .min(1, "At least one chapter is required"),
  externalUrl: z
    .string()
    .url("External URL must be a valid URL")
    .or(z.literal("")),
  projectManager: z.string().min(1, "Project manager is required"),
  contentsNumero: z.string().min(1, "Contents numero is required"),
  isPublished: z.boolean(),
  slug: z.string().min(1, "Slug is required"),
});

export type NewsInput = z.input<typeof newsSchema>;
export type NewsOutput = z.output<typeof newsSchema>;

export const initialNews: NewsInput = {
  title: "",
  thumbnail: null,
  category: "NEWS",
  summary: "",
  publishedAt: new Date(),
  chapters: [
    {
      title: "",
      contents: [
        {
          type: "TEXT",
          text: "",
        },
      ],
    },
  ],
  externalUrl: "",
  projectManager: "",
  contentsNumero: "",
  isPublished: false,
  slug: "",
};
