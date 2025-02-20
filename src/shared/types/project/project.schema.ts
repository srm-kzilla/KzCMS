import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  typeName: z.string(),
});

export const ProjectSchema = z.object({
  _id: z.custom(value => value instanceof ObjectId),
  projectSlug: z.string(),
  projectName: z.string(),
  userAccess: z.array(z.string()),
  isDeleted: z.boolean().default(false),
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

export const ProjectDataCreateSchema = ProjectDataSchema.pick({
  title: true,
  description: true,
  link: true,
  subType: true,
});

export const ProjectDataUpdateSchema = ProjectDataSchema.pick({
  title: true,
  description: true,
  link: true,
  subType: true,
});

export const ProjectIdSchema = z.object({
  projectId: z.string(),
});

export const ProjectSlugSchema = z.object({
  slug: z.string(),
});

export const ProjectDataIdSchema = z.object({
  projectDataId: z.string(),
});

export const ProjectTitleSchema = z.object({
  title: z.string(),
});

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectDataType = z.infer<typeof ProjectDataSchema>;
export type ProjectSlugType = z.infer<typeof ProjectSlugSchema>;
export type ProjectTitleType = z.infer<typeof ProjectTitleSchema>;
export type ProjectIdType = z.infer<typeof ProjectIdSchema>;
export type ProjectDataUpdateType = z.infer<typeof ProjectDataUpdateSchema>;
export type ProjectDataCreateType = z.infer<typeof ProjectDataCreateSchema>;
export type ProjectDataIdType = z.infer<typeof ProjectDataIdSchema>;
