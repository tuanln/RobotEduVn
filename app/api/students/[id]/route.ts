import { NextRequest, NextResponse } from "next/server";
import { verifyAuthAndRole } from "@/lib/api/auth";
import { getStudent, updateStudent, deleteStudent } from "@/lib/firestore/students";
import { normalizeNhipSlug } from "@/lib/content/nhip-slug";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await verifyAuthAndRole(request, ["admin", "teacher", "parent"]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const student = await getStudent(id);
  if (!student) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await verifyAuthAndRole(request, ["admin", "teacher"]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  const body = await request.json();
  const ALLOWED_FIELDS = [
    "fullName", "nickname", "dateOfBirth", "gender", "grade",
    "school", "parentName", "parentPhone", "parentEmail",
    "currentStage", "makerHubId", "mentorId",
  ];
  const sanitized = Object.fromEntries(
    Object.entries(body).filter(([k]) => ALLOWED_FIELDS.includes(k))
  );
  if ("currentStage" in sanitized) {
    sanitized.currentStage = normalizeNhipSlug(sanitized.currentStage as string);
  }
  await updateStudent(id, sanitized);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await verifyAuthAndRole(request, ["admin"]);
  if ("error" in authResult) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    );
  }

  await deleteStudent(id);
  return NextResponse.json({ ok: true });
}
