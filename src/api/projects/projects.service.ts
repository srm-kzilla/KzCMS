interface Project {
  slug: string;
  name: string;
}

interface ProjectData {
  slug: string;
  data: {
    title: string;
    description: string;
    imageURL: string;
    link: string;
    author: string;
  }[];
}

export const handleGetAllProjects = async (): Promise<Project[]> => {
  return [];
};

export const handleGetProject = async (slug: string): Promise<ProjectData> => {
  return { slug, data: [] };
};

export const handleCreateProject = async (project: Project): Promise<Project> => {
  return project;
};

export const handleCreateProjects = async (): Promise<unknown[]> => {
  return [];
};
