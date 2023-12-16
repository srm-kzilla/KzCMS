export type ProjectItem = {
  author?: string;
  description?: string;
  imageURL: string;
  link: string;
  title: string;
}

export type Project = {
  id: string;
  projectSlug: string;
  projectName: string;
  data: ProjectItem[];
  userAccess: string[];
  isDeleted: boolean;
  isEnabled: boolean;
}

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  projects: string[];
}
