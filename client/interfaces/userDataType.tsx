export default interface UserDataType {
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    isDeleted: boolean;
    projects: string[];
    createdAt: string;
}