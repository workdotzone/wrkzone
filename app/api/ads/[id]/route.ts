import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Delete an ad (owner or admin)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ad = await prisma.ad.findUnique({ where: { id } });
  if (!ad) {
    return NextResponse.json({ error: "Ad not found" }, { status: 404 });
  }
  if (ad.userId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.ad.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

// Update ad status / featured (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const data: { status?: "PENDING" | "APPROVED" | "REJECTED"; featured?: boolean } = {};
  if (body.status) data.status = body.status;
  if (typeof body.featured === "boolean") data.featured = body.featured;

  const ad = await prisma.ad.update({ where: { id }, data });
  return NextResponse.json({ ok: true, ad });
}
