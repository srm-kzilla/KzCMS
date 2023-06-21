import { ObjectId } from 'mongodb';
import database from '../../loaders/database';

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
  data: {
    title: string;
    description: string;
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
    description?: string;
    link?: string;
    author?: string;
  },
): Promise<UpdatedProjectData & any> => {
  const projectsCollection = (await database()).collection('projects');
  const project = await projectsCollection.findOne({ projectSlug: slug });
  if (project) {
    const filter = { _id: new ObjectId(project._id), 'data.title': data.title };

    const update = {
      $set: { 'data.$': { ...data } },
    };

    const updatedProject = await projectsCollection.findOneAndUpdate(filter, update, { returnDocument: 'after' });

    return { success: true, slug, updatedProject: updatedProject.value };
  } else {
    return { success: false, message: `Project with slug "${slug}" not found`, data };
  }
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
