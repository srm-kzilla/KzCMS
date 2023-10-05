import { z } from 'zod';

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  typeName: z.string(),
});

export const ProjectSchema = z.object({
  projectSlug: z.string(),
  userAccess: z.array(z.string()),
  data: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      imageURL: z.string().url(),
      link: z.string().url().optional(),
      author: z.string().optional(),
    }),
  ),
  isEnabled: z.boolean(),
  isDeleted: z.boolean(),
});

export const ProjectDataSchema = z.object({
  title: z.string(),
  newTitle: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional(),
  link: z.string().url().optional(),
  author: z.string().optional(),
});

export const ProjectSlugSchema = z.object({
  slug: z.string(),
});

export const ProjectImageSlugSchema = z.object({
  slug: z.string(),
  title: z.string(),
});

export const ProjectMetadataSchema = z.object({
  newName: z.string(),
  newSlug: z.string(),
});

export const ProjectTitleSchema = z.object({
  title: z.string(),
});

export const ToggleProjectSchema = z.object({
  slug: z.string(),
  isEnabled: z.boolean().optional(),
  isDevelopment: z.boolean().optional(),
});

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectDataType = z.infer<typeof ProjectDataSchema>;
export type ProjectMetadataType = z.infer<typeof ProjectMetadataSchema>;
export type ProjectSlugType = z.infer<typeof ProjectSlugSchema>;
export type ProjectImageSlugType = z.infer<typeof ProjectImageSlugSchema>;
export type ProjectTitleType = z.infer<typeof ProjectTitleSchema>;
export type ToggleProjectType = z.infer<typeof ToggleProjectSchema>;
