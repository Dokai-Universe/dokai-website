import z from "zod";

export const adminMemberRoleSchema = z.enum(["admin", "staff"]);

export const adminMemberSchema = z.object({
  memberId: z.string().min(1),
  email: z.string().email("Invalid email"),
  role: adminMemberRoleSchema.nullable().default(null),
  isFixed: z.boolean().default(false),
  fixedOrder: z.number().nullable().default(null),
});

export const adminMembersSchema = z.object({
  members: z.array(adminMemberSchema),
});

export type AdminMembersInput = z.input<typeof adminMembersSchema>;
export type AdminMembersOutput = z.output<typeof adminMembersSchema>;
