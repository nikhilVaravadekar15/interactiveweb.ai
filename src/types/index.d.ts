import { inputFormSchema } from "@/zod/index";

export type TInputFormSchema = z.infer<typeof inputFormSchema>;
