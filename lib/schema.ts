import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const resultUploadSchema = z.object({
  stateId: z.string().min(1, "Please select a state"),

  lgaId: z.string().min(1, "Please select an LGA"),

  wardId: z.string().min(1, "Please select a ward"),

  pollingUnitId: z.string().min(1, "Please select a polling unit"),

  document: z
    .instanceof(File, {
      message: "Please upload a result sheet",
    })
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG and WebP images are allowed",
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, "Image must not exceed 10MB"),
});

export type ResultUploadInput = z.infer<typeof resultUploadSchema>;
