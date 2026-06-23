import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black -z-20" />
      
      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-fb8500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -z-10" />
      
      {/* Top gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-fb8500 to-blue-600" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-blue-900/40 to-fb8500/40 backdrop-blur-md p-8 border border-white/10 hover:border-white/20 transition-all">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Stay Updated</h3>
              <p className="text-white/80">Get the latest service trends and exclusive offers right in your inbox.</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-fb8500/50 focus:bg-white/20 transition-all"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-fb8500 to-yellow-500 text-white font-bold hover:shadow-lg hover:shadow-fb8500/50 transition-all hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          {/* Brand section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-fb8500 text-lg font-bold text-white">
                🔧
              </span>
              <span className="text-xl font-extrabold">
                <span className="text-white">Wrk</span>
                <span className="bg-gradient-to-r from-fb8500 to-yellow-400 bg-clip-text text-transparent">Zone</span>
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Connect with trusted professionals or grow your service business. All in one platform.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {[
                { icon: "👍", href: "https://facebook.com", label: "Facebook" },
                { icon: "🐦", href: "https://twitter.com", label: "Twitter" },
                { icon: "📷", href: "https://instagram.com", label: "Instagram" },
                { icon: "🔗", href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-blue-600 hover:to-fb8500 text-white transition-all hover:scale-110"
                  title={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <FooterCol
            title="Explore"
            links={[
              ["Browse Services", "/ads"],
              ["Post an Ad", "/post"],
              ["Categories", "/#categories"],
              ["How it Works", "/about"],
              ["Contact Us", "/about"],
            ]}
          />
          <FooterCol
            title="Account"
            links={[
              ["Login", "/login"],
              ["Register", "/register"],
              ["Dashboard", "/dashboard"],
              ["My Services", "/dashboard"],
              ["Help Center", "/about"],
            ]}
          />
          <FooterCol
            title="Popular Services"
            links={[
              ["💧 Plumbing", "/category/plumbing"],
              ["❄️ AC Repair", "/category/ac-repair"],
              ["🐛 Pest Control", "/category/pest-control"],
              ["🧹 Cleaning", "/category/cleaning"],
              ["⚡ More Categories", "/ads"],
            ]}
          />
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid md:grid-cols-3 gap-6 items-center text-sm">
            <div className="text-white/70">
              <p>© {new Date().getFullYear()} WrkZone. Built with 💙 for professionals.</p>
            </div>
            <div className="flex justify-center gap-6">
              <Link href="/about" className="text-white/70 hover:text-fb8500 transition">Privacy Policy</Link>
              <Link href="/about" className="text-white/70 hover:text-fb8500 transition">Terms of Service</Link>
              <Link href="/about" className="text-white/70 hover:text-fb8500 transition">Cookie Policy</Link>
            </div>
            <div className="text-right text-white/70">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span>🌍</span>
                <span>Made Globally</span>
              </p>
            </div>
          </div>
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
      <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-fb8500 to-yellow-400" />
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link 
              href={href} 
              className="text-sm text-white/70 hover:text-fb8500 transition-all hover:translate-x-1 inline-block"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
