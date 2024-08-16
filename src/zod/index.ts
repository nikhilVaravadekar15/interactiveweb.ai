import { z } from "zod";

export const inputFormSchema = z.object({
  url: z.string().url("Invalid Url").min(1, "Invalid url"),
});
