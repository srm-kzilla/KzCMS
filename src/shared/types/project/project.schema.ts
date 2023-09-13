import { z } from 'zod';

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  typeName: z.string(),
});

export const BaseProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
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
});

export const ProjectDataSchema = z.object({
  title: z.string(),
  newTitle: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional(),
  link: z.string().url().optional(),
  author: z.string().optional(),
});

export const ProjectSlugSchmea = z.object({
  slug: z.string(),
});

export const ProjectMetadataSchema = z.object({
  newName: z.string(),
  newSlug: z.string(),
});

export const ProjectTitleSchema = z.object({
  title: z.string(),
});

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type BaseProjectType = z.infer<typeof BaseProjectSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectDataType = z.infer<typeof ProjectDataSchema>;
export type ProjectMetadataType = z.infer<typeof ProjectMetadataSchema>;
export type ProjectSlugType = z.infer<typeof ProjectSlugSchmea>;
export type ProjectTitleType = z.infer<typeof ProjectTitleSchema>;
