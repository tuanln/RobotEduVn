import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUserDoc } from "@/lib/firestore/users";
import type { UserDoc } from "@/lib/types/auth";

type AuthSuccess = { uid: string; userDoc: UserDoc };
type AuthError = { error: string; status: number };

export async function verifyAuthAndRole(
  request: NextRequest,
  allowedRoles: string[]
): Promise<AuthSuccess | AuthError> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await getUserDoc(decoded.uid);

    if (!userDoc || !allowedRoles.includes(userDoc.role)) {
      return { error: "Forbidden", status: 403 };
    }

    return { uid: decoded.uid, userDoc };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}
