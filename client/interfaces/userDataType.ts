export default interface UserDataType {
    id: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    isDeleted: boolean;
    projects: string[];
}