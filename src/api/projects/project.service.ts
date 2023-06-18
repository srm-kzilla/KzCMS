interface UpdatedProjectData {
  slug: string;
  data: {
    title: string;
    description: string;
    imageURL: string;
    link: string;
    author: string;
  }[];
}

interface ImageData {
  title: string; // this should exsist in Project Data
  image: string;
}

export const handleUpdateProject = async (slug: string): Promise<UpdatedProjectData> => {
  return { slug, data: [] };
};

export const handleDeleteProject = async (slug: string): Promise<unknown> => {
  return { success: true, message: `${slug} deleted` };
};

export const handlePostImage = async (title: string, image: File): Promise<ImageData> => {
  return { title, image: 'image_url' };
};

export const handleDeleteImage = async (slug: string, title: string, imageUrl: string): Promise<unknown> => {
  return { success: true, message: `${imageUrl} deleted from ${title} of project ${slug}` };
};
