import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { title, image, link, placement } = await req.json();
  if (!title || !image) {
    return NextResponse.json(
      { error: "Title and image are required" },
      { status: 400 }
    );
  }
  const ad = await prisma.advertisement.create({
    data: {
      title,
      image,
      link: link || null,
      placement: placement || "home",
    },
  });
  return NextResponse.json({ ok: true, ad }, { status: 201 });
}
