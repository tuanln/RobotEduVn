import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUserDoc } from "@/lib/firestore/users";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await getUserDoc(decoded.uid);

    if (!userDoc) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email,
      displayName: userDoc.displayName,
      role: userDoc.role,
      linkedStudentIds: userDoc.linkedStudentIds,
      makerHubId: userDoc.makerHubId,
    });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
