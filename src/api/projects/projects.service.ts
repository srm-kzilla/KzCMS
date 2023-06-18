interface Project {
  slug: string;
  name: string;
}

interface ImageData {
  slug: string;
  title: string;
  image: File;
}

interface UpdatedProjectData {
  slug: string;
  data: {
    title: string;
    description: string;
    imageURL: string;
    link: string;
    author: string;
  };
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

export const handleUpdateProject = async (
  slug: string,
  data: {
    title: string;
    description: string;
    imageURL: string;
    link: string;
    author: string;
  },
): Promise<UpdatedProjectData> => {
  //update the project here
  return { slug, data };
};

export const handleDeleteProject = async (slug: string): Promise<unknown> => {
  //delete a specific project
  return { success: true, message: `${slug} deleted` };
};

export const handlePostImage = async (data: {
  slug: string;
  title: string;
  image: File;
}): Promise<{ data: ImageData }> => {
  // post an image
  return { data };
};

export const handleDeleteImage = async (slug: string, title: string, imageUrl: string): Promise<unknown> => {
  return { success: true, message: `${imageUrl} deleted from ${title} of project ${slug}` };
};
