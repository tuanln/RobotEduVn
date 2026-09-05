import type { LearningStage } from "../types";

export interface Student {
  id: string;
  paperId: string;
  rfidUid?: string;
  fullName: string;
  nickname: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  grade?: number;
  school?: string;
  parentPhone?: string;
  parentEmail?: string;
  parentName?: string;
  currentStage: LearningStage;
  totalStars: number;
  badges: string[];
  streak: number;
  makerHubId: string;
  mentorId?: string;
  status: "active" | "inactive" | "graduated";
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentFormData {
  fullName: string;
  nickname: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  grade?: number;
  school?: string;
  parentPhone?: string;
  parentEmail?: string;
  parentName?: string;
  currentStage: LearningStage;
  makerHubId: string;
  mentorId?: string;
}
