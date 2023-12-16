import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  typeName: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  projectSlug: z.string(),
  userAccess: z.array(z.string()),
  data: z.array(z.string()),
});

export const ProjectDataSchema = z.object({
  _id: z.custom(value => value instanceof ObjectId),
  projectSlug: z.string(),
  title: z.string(),
  subType: z.string().optional(),
  description: z.string().optional(),
  imageURL: z.string().url().optional(),
  link: z.string().url().optional(),
  author: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

export const ProjectIdSchema = ProjectSchema.pick({ id: true });

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

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectDataType = z.infer<typeof ProjectDataSchema>;
export type ProjectMetadataType = z.infer<typeof ProjectMetadataSchema>;
export type ProjectSlugType = z.infer<typeof ProjectSlugSchema>;
export type ProjectImageSlugType = z.infer<typeof ProjectImageSlugSchema>;
export type ProjectTitleType = z.infer<typeof ProjectTitleSchema>;
export type ProjectIdType = z.infer<typeof ProjectIdSchema>;
