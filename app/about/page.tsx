import Link from "next/link";

export const metadata = { title: "How it works — WrkZone" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-peach-100 px-4 py-1.5 text-sm font-semibold text-sun-600 ring-1 ring-peach-200">
          ☀️ About WrkZone
        </span>
        <h1 className="mt-4 text-4xl font-extrabold">
          Local help, made <span className="sunrise-text">simple</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          WrkZone is a friendly classifieds marketplace that connects skilled
          handymen — plumbers, AC technicians, pest control, cleaners,
          electricians and more — directly with the people who need them. No
          middlemen, no commissions, just honest work.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card icon="🧑‍🔧" title="For service providers">
          Create a free account, post your service ad with photos and pricing,
          and start receiving calls and WhatsApp messages from local customers.
          Build your reputation with ratings and reviews.
        </Card>
        <Card icon="🏠" title="For customers">
          Search by service and city, compare providers, read reviews, and
          contact pros directly. Everything you need to get the job done — fast.
        </Card>
        <Card icon="🛡️" title="Safe & trusted">
          Every ad is reviewed by our team before going live. We encourage
          in-person verification and safe payment practices.
        </Card>
        <Card icon="💛" title="Always free to start">
          Posting your first ads is completely free. Optional featured listings
          help you stand out when you&apos;re ready to grow.
        </Card>
      </div>

      <div className="mt-12 rounded-3xl sunrise-gradient px-8 py-12 text-center text-white shadow-2xl shadow-sun-500/30">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to start?</h2>
        <p className="mt-2 text-white/90">Join the WrkZone community today.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/register" className="rounded-full bg-white px-7 py-3 text-sm font-extrabold text-sun-600 shadow-lg hover:scale-[1.03] transition">
            Create account
          </Link>
          <Link href="/ads" className="rounded-full bg-white/20 px-7 py-3 text-sm font-extrabold text-white ring-1 ring-white/40 hover:bg-white/30 transition">
            Browse ads
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 ring-1 ring-peach-200 shadow-sm">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-1 text-ink-soft">{children}</p>
    </div>
  );
}
