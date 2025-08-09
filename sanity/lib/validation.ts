import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url().refine(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        const contentType = response.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch (error) {
        console.error("Image URL validation failed:", error);
        return false;
      }
    },
    { message: "URL must point to a valid image" }),
    pitch: z.string().min(10)
})