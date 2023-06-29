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
  data: z.object({
    title: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    author: z.string().optional(),
  }),
});

export const DeleteProjectSchema = z.object({
  slug: z.string(),
});

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type BaseProjectType = z.infer<typeof BaseProjectSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type ProjectDataType = z.infer<typeof ProjectDataSchema>;
export type DeleteProjectType = {
  params: z.infer<typeof DeleteProjectSchema>;
};
