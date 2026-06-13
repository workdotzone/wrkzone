import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Create a new ad
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Please log in to post an ad." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      price,
      priceType,
      city,
      area,
      phone,
      email,
      image,
      categoryId,
    } = body;

    if (!title || !description || !city || !phone || !categoryId) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const ad = await prisma.ad.create({
      data: {
        title,
        description,
        price: price ? parseFloat(price) : null,
        priceType: priceType || "Fixed",
        city,
        area: area || null,
        phone,
        email: email || null,
        image: image || null,
        categoryId,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({ ok: true, id: ad.id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create ad." }, { status: 500 });
  }
}
