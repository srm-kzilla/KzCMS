import { z } from 'zod';

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  typeName: z.string(),
});

export const BaseProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

export const ImageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  image: z.string(),
});

export const ProjectDataSchema = z.object({
  slug: z.string(),
  userAccess: z.array(z.string()),
  data: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      imageURL: z.string(),
      link: z.string().url(),
      author: z.string(),
    }),
  ),
});

export const UpdateProjectDataSchema = z.object({
  slug: z.string(),
  data: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url(),
    author: z.string(),
  }),
});

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type BaseProjectType = z.infer<typeof BaseProjectSchema>;
export type ImageType = z.infer<typeof ImageSchema>;
export type UpdateProjectType = z.infer<typeof UpdateProjectDataSchema>;
export type ProjectDataType = z.infer<typeof ProjectDataSchema>;
