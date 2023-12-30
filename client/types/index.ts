export type ProjectItem = {
  _id: string;
  author?: string;
  description?: string;
  imageURL: string;
  link: string;
  title: string;
};

export type Project = {
  _id: string;
  projectSlug: string;
  projectName: string;
  data: ProjectItem[];
  userAccess: string[];
  isDeleted: boolean;
  isEnabled: boolean;
};

export type User = {
  _id: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  projects: string[];
};
