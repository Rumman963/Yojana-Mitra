import { z } from "zod";
import { Gender, SocialCategory } from "../generated/prisma/enums";

export const profileSchema = z.object({
  age: z.number().int().min(0).max(120).optional(),
  state: z.string().min(1).optional(),
  gender: z.enum(Gender).optional(),
  annualIncome: z.number().min(0).optional(),
  socialCategory: z.enum(SocialCategory).optional(),
  occupation: z.string().min(1).optional(),
});