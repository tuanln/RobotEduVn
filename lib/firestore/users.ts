import { adminDb } from "@/lib/firebase/admin";
import type { UserDoc } from "@/lib/types/auth";

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const snap = await adminDb.collection("users").doc(uid).get();
  if (!snap.exists) return null;
  return { ...snap.data() } as UserDoc;
}

export async function createUserDoc(
  uid: string,
  data: Omit<UserDoc, "createdAt" | "updatedAt">
): Promise<void> {
  const now = new Date();
  await adminDb
    .collection("users")
    .doc(uid)
    .set({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
}
