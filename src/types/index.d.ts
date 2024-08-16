import { inputFormSchema } from "@/zod/index";

export type TInputFormSchema = z.infer<typeof inputFormSchema>;

export type TSite = {
  id: string;
  url: string;
  created_at: string;
};
