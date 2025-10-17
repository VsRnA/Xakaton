import UserRole, { UserRoleAssignmentCreationAttributes } from "../models/userRole"

export default async (userData: UserRoleAssignmentCreationAttributes)  => UserRole.create(userData);
