import ProjectDataType from "./projectDataType";

export default interface ProjectListDataType {
  _id: string;
  projectSlug: string;
  projectName: string;
  data: ProjectDataType[];
  userAccess: string[];
  isDeleted: boolean;
  isEnabled: boolean;
}