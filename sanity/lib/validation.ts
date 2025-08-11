import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url(), // initial basic URL validation
  pitch: z.string().min(10),
}).superRefine(async (data, ctx) => {
  try {
    const res = await fetch(data.link, { method: "HEAD" });
    const type = res.headers.get("content-type");

    if (!type?.startsWith("image/")) {
      ctx.addIssue({
        path: ['link'],
        code: z.ZodIssueCode.custom,
        message: "URL must point to a valid image.",
      });
    }
  } catch (err) {
    ctx.addIssue({
      path: ['link'],
      code: z.ZodIssueCode.custom,
      message: "Failed to reach the URL.",
    });
  }
});