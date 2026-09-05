import { adminDb } from "@/lib/firebase/admin";
import type { Student, StudentFormData } from "@/lib/types/student";

const STUDENTS = "students";
const COUNTERS = "counters";

async function getNextPaperId(): Promise<string> {
  const counterRef = adminDb.collection(COUNTERS).doc("students");
  const result = await adminDb.runTransaction(async (tx) => {
    const counterDoc = await tx.get(counterRef);
    const current = counterDoc.exists ? (counterDoc.data()?.lastNumber || 0) : 0;
    const next = current + 1;
    tx.set(counterRef, { lastNumber: next }, { merge: true });
    return next;
  });
  const year = new Date().getFullYear();
  return `STU-${year}-${String(result).padStart(4, "0")}`;
}

export async function listStudents(filters?: {
  makerHubId?: string;
  mentorId?: string;
  status?: string;
  search?: string;
}): Promise<Student[]> {
  let query: FirebaseFirestore.Query = adminDb.collection(STUDENTS);

  if (filters?.makerHubId) {
    query = query.where("makerHubId", "==", filters.makerHubId);
  }
  if (filters?.mentorId) {
    query = query.where("mentorId", "==", filters.mentorId);
  }
  if (filters?.status) {
    query = query.where("status", "==", filters.status);
  }

  query = query.orderBy("createdAt", "desc").limit(100);

  const snap = await query.get();
  let students = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Student[];

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    students = students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(searchLower) ||
        s.paperId.toLowerCase().includes(searchLower) ||
        s.nickname.toLowerCase().includes(searchLower)
    );
  }

  return students;
}

export async function getStudent(id: string): Promise<Student | null> {
  const snap = await adminDb.collection(STUDENTS).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Student;
}

export async function createStudent(data: StudentFormData): Promise<Student> {
  const paperId = await getNextPaperId();
  const now = new Date();

  const studentData = {
    ...data,
    paperId,
    rfidUid: "",
    totalStars: 0,
    badges: [],
    streak: 0,
    status: "active" as const,
    createdAt: now,
    updatedAt: now,
  };

  const ref = await adminDb.collection(STUDENTS).add(studentData);
  return { id: ref.id, ...studentData };
}

export async function updateStudent(
  id: string,
  data: Partial<StudentFormData>
): Promise<void> {
  await adminDb
    .collection(STUDENTS)
    .doc(id)
    .update({
      ...data,
      updatedAt: new Date(),
    });
}

export async function deleteStudent(id: string): Promise<void> {
  await adminDb.collection(STUDENTS).doc(id).update({
    status: "inactive",
    updatedAt: new Date(),
  });
}
