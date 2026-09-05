export type UserRole = "admin" | "teacher" | "parent" | "student";

export interface UserDoc {
  email: string;
  displayName: string;
  role: UserRole;
  linkedStudentIds: string[];
  makerHubId?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  linkedStudentIds: string[];
  makerHubId?: string;
}
