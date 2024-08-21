import { inputFormSchema } from "@/zod/index";

export type TInputFormSchema = z.infer<typeof inputFormSchema>;

export type TSite = {
  id: string;
  url: string;
  collection_name: string;
  created_at: Date;
};

export type TMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};
