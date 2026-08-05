import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#071B24]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500"></div>

          <span className="text-2xl font-bold text-white">
            Procurement Copilot
          </span>
        </Link>

        {/* Menu */}

        <nav className="hidden items-center gap-10 text-white lg:flex">

          <Link href="/">Product</Link>

          <Link href="/">Solutions</Link>

          <Link href="/">AI Agents</Link>

          <Link href="/">Resources</Link>

          <Link href="/">Pricing</Link>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-5">

          <Link
            href="/login"
            className="font-medium text-white hover:text-teal-300"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Book a Demo
          </Link>

        </div>

      </div>
    </header>
  );
}