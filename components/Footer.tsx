import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-200 bg-neutral-50/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl primary-gradient text-lg">
                ⚙️
              </span>
              <span className="text-lg font-extrabold">
                Wrk<span className="primary-text">Zone</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Find trusted professionals — or grow your service business — all in one place.
            </p>
          </div>

          <FooterCol
            title="Explore"
            links={[
              ["Browse Ads", "/ads"],
              ["Post an Ad", "/post"],
              ["Categories", "/#categories"],
              ["How it works", "/about"],
            ]}
          />
          <FooterCol
            title="Account"
            links={[
              ["Login", "/login"],
              ["Register", "/register"],
              ["My Dashboard", "/dashboard"],
            ]}
          />
          <FooterCol
            title="Popular"
            links={[
              ["Plumbing", "/category/plumbing"],
              ["AC Repair", "/category/ac-repair"],
              ["Pest Control", "/category/pest-control"],
              ["Cleaning", "/category/cleaning"],
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600 sm:flex-row">
          <p>© {new Date().getFullYear()} WrkZone. Made with 💙 for hard workers.</p>
          <p className="flex gap-4">
            <Link href="/about" className="hover:text-primary-blue transition">Privacy</Link>
            <Link href="/about" className="hover:text-primary-blue transition">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-800">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm text-neutral-600 hover:text-primary-blue transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
