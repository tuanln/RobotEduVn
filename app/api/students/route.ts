import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUserDoc } from "@/lib/firestore/users";
import { listStudents, createStudent } from "@/lib/firestore/students";
import type { StudentFormData } from "@/lib/types/student";

async function verifyAuthAndRole(request: NextRequest, allowedRoles: string[]) {
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

export async function GET(request: NextRequest) {
  const authResult = await verifyAuthAndRole(request, ["admin", "teacher"]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const { searchParams } = new URL(request.url);

  const students = await listStudents({
    makerHubId: searchParams.get("makerHubId") || undefined,
    mentorId: searchParams.get("mentorId") || undefined,
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
  });

  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const authResult = await verifyAuthAndRole(request, ["admin", "teacher"]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const body = (await request.json()) as StudentFormData;

  if (!body.fullName || !body.nickname || !body.makerHubId) {
    return NextResponse.json(
      { error: "fullName, nickname, makerHubId are required" },
      { status: 400 }
    );
  }

  const student = await createStudent(body);
  return NextResponse.json(student, { status: 201 });
}
