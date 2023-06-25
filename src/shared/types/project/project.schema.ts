import { z } from 'zod';

export const createProjectSchema = z.object({
  projectName: z.string(),
  teamName: z.string(),
});

export const baseProjecSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

export const imageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  image: z.string(),
});

export const projectDataSchema = z.object({
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

export const updateProjectDataSchema = z.object({
  slug: z.string(),
  data: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url(),
    author: z.string(),
  }),
});

export type createProjectType = z.infer<typeof createProjectSchema>;
export type baseProjectType = z.infer<typeof baseProjecSchema>;
export type imageType = z.infer<typeof imageSchema>;
export type updateProjectType = z.infer<typeof updateProjectDataSchema>;
export type ProjectDataType = z.infer<typeof projectDataSchema>;
