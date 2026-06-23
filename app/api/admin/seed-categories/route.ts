import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// This endpoint securely seeds categories to production database
// Only works with valid admin token in Authorization header

export async function POST(request: NextRequest) {
  try {
    // Simple security check - in production use proper authentication
    const authHeader = request.headers.get("authorization");
    const adminToken = process.env.ADMIN_SEED_TOKEN || "seed-token-123";

    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const categories = [
      { name: "Plumbing", slug: "plumbing", icon: "🔧", color: "#3b82f6" },
      { name: "AC Repair", slug: "ac-repair", icon: "❄️", color: "#06b6d4" },
      { name: "Pest Control", slug: "pest-control", icon: "🐜", color: "#84cc16" },
      { name: "Cleaning", slug: "cleaning", icon: "🧹", color: "#f59e0b" },
      { name: "Electrician", slug: "electrician", icon: "💡", color: "#eab308" },
      { name: "Carpentry", slug: "carpentry", icon: "🔨", color: "#d97706" },
      { name: "Painting", slug: "painting", icon: "🎨", color: "#ec4899" },
      { name: "Appliance Repair", slug: "appliance-repair", icon: "🔌", color: "#8b5cf6" },
      { name: "Gardening", slug: "gardening", icon: "🌿", color: "#22c55e" },
      { name: "Movers & Packers", slug: "movers-packers", icon: "📦", color: "#f97316" },
      { name: "Home Salon", slug: "home-salon", icon: "💇", color: "#f43f5e" },
      { name: "CCTV & Security", slug: "cctv-security", icon: "📹", color: "#64748b" },
      { name: "Computer Repair", slug: "computer-repair", icon: "💻", color: "#0891b2" },
      { name: "Mobile Repair", slug: "mobile-repair", icon: "📱", color: "#06b6d4" },
      { name: "Construction", slug: "construction", icon: "🏗️", color: "#d97706" },
      { name: "Tuition & Coaching", slug: "tuition-coaching", icon: "📚", color: "#8b5cf6" },
      { name: "Photography", slug: "photography", icon: "📸", color: "#f43f5e" },
      { name: "Fitness Trainer", slug: "fitness-trainer", icon: "💪", color: "#ef4444" },
    ];

    const results = [];
    for (const cat of categories) {
      const result = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {}, // Don't update if exists
        create: cat,
      });
      results.push({ name: result.name, action: result.id ? "created/updated" : "exists" });
    }

    return NextResponse.json({
      success: true,
      message: `${categories.length} categories processed`,
      results,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed categories", details: String(error) },
      { status: 500 }
    );
  }
}
