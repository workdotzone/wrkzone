import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
];

const sampleAds = [
  {
    title: "Expert Plumber — 24/7 Emergency Service",
    description:
      "Over 12 years of experience in pipe fitting, leak repair, bathroom fittings, and water tank installation. Quick response, fair pricing, and guaranteed work. Available all days including holidays.",
    price: 299,
    priceType: "Hourly",
    city: "Mumbai",
    area: "Andheri West",
    phone: "9876543210",
    slug: "plumbing",
    featured: true,
  },
  {
    title: "Split & Window AC Service + Gas Refilling",
    description:
      "Professional AC servicing, gas refilling, installation and uninstallation. We handle all brands — Voltas, LG, Samsung, Daikin. Free inspection on first visit. Cooling guaranteed!",
    price: 499,
    priceType: "Fixed",
    city: "Pune",
    area: "Kothrud",
    phone: "9823456710",
    slug: "ac-repair",
    featured: true,
  },
  {
    title: "Herbal Pest Control — Cockroach & Termite",
    description:
      "Safe, odourless, child & pet-friendly pest control treatment. Specializing in cockroaches, termites, bed bugs, and mosquitoes. 6 months warranty on all treatments.",
    price: 899,
    priceType: "Fixed",
    city: "Delhi",
    area: "Rohini",
    phone: "9811122334",
    slug: "pest-control",
    featured: true,
  },
  {
    title: "Deep Home Cleaning — Kitchen & Bathroom",
    description:
      "Sparkling deep cleaning service for homes and offices. Trained staff, eco-friendly products, and complete sanitization. Perfect before festivals or moving in/out.",
    price: 1499,
    priceType: "Negotiable",
    city: "Bangalore",
    area: "Whitefield",
    phone: "9900112233",
    slug: "cleaning",
    featured: true,
  },
  {
    title: "Licensed Electrician — Wiring & Repairs",
    description:
      "Complete electrical solutions — new wiring, fan/light installation, MCB & inverter setup, short-circuit fixing. Safety-certified and insured work.",
    price: 350,
    priceType: "Hourly",
    city: "Mumbai",
    area: "Bandra",
    phone: "9870011223",
    slug: "electrician",
    featured: false,
  },
  {
    title: "Custom Carpentry & Furniture Repair",
    description:
      "Modular kitchen, wardrobes, beds, and furniture repair. Quality wood, neat finishing, on-time delivery. Free design consultation at your home.",
    price: 600,
    priceType: "Negotiable",
    city: "Hyderabad",
    area: "Gachibowli",
    phone: "9701234567",
    slug: "carpentry",
    featured: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Categories
  const categoryMap: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categoryMap[c.slug] = cat.id;
  }
  console.log(`✅ ${categories.length} categories`);

  // Admin user
  const adminPass = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@wrkzone.com" },
    update: {},
    create: {
      name: "WrkZone Admin",
      email: "admin@wrkzone.com",
      password: adminPass,
      role: "ADMIN",
      city: "Mumbai",
      phone: "9999999999",
    },
  });

  // Demo user
  const userPass = await bcrypt.hash("user123", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "rahul@wrkzone.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul@wrkzone.com",
      password: userPass,
      role: "USER",
      city: "Mumbai",
      phone: "9876543210",
    },
  });
  console.log("✅ Admin + demo user created");

  // Sample ads
  for (const ad of sampleAds) {
    const { slug, ...rest } = ad;
    const existing = await prisma.ad.findFirst({ where: { title: ad.title } });
    if (existing) continue;
    await prisma.ad.create({
      data: {
        ...rest,
        status: "APPROVED",
        categoryId: categoryMap[slug],
        userId: demoUser.id,
        views: Math.floor(Math.random() * 200),
      },
    });
  }
  console.log(`✅ ${sampleAds.length} sample ads`);

  // Banner advertisements
  const banners = [
    {
      title: "Monsoon Offer — 20% off on Pest Control",
      image: "/banners/banner2.svg",
      link: "/category/pest-control",
      placement: "sidebar",
    },
  ];
  for (const b of banners) {
    const existing = await prisma.advertisement.findFirst({
      where: { title: b.title },
    });
    if (existing) continue;
    await prisma.advertisement.create({ data: b });
  }
  console.log(`✅ ${banners.length} banner ads`);

  console.log("\n🎉 Done!");
  console.log("   Admin login: admin@wrkzone.com / admin123");
  console.log("   User login:  rahul@wrkzone.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
