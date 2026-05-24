"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, FormEvent } from "react";

/* ─── Motion Variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

/* ─── Reveal Hook ──────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ─── Divider ──────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}

/* ─── Icons ────────────────────────────────────────────────── */
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconLayout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconExternalLink = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
    <path d="M7 3H3v10h10V9M9 3h4v4M13 3L7 9" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

/* ─── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: <IconGlobe />,
    title: "Web Development",
    desc: "Custom websites built to perform — clean code, fast load times, and optimized to convert visitors into customers.",
    gradient: "from-blue-600/15 to-blue-900/5",
    border: "group-hover:border-blue-500/30",
  },
  {
    icon: <IconLayout />,
    title: "Landing Pages",
    desc: "High-converting pages designed with one goal: turning clicks into clients. Built fast, looks sharp.",
    gradient: "from-violet-600/15 to-violet-900/5",
    border: "group-hover:border-violet-500/30",
  },
  {
    icon: <IconCart />,
    title: "E-Commerce",
    desc: "Online stores that make buying effortless — from product pages to seamless checkout experiences.",
    gradient: "from-indigo-600/15 to-indigo-900/5",
    border: "group-hover:border-indigo-500/30",
  },
  {
    icon: <IconCode />,
    title: "Software Development",
    desc: "Custom tools, web apps, and dashboards built to solve real problems. Full-stack, from idea to deployment.",
    gradient: "from-cyan-600/15 to-cyan-900/5",
    border: "group-hover:border-cyan-500/30",
  },
];

const PROJECTS = [
  {
    title: "Appointly",
    desc: "Full-stack appointment booking platform for service businesses — salons, barbershops, spas, tattoo studios. Clients discover businesses, book appointments, and pay deposits. Owners manage calendar, staff, services, and settings from a dedicated dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-teal-950 via-cyan-950 to-[#080808]",
    accent: "bg-teal-500/20 text-teal-300",
    num: "01",
    liveUrl: "https://appointment-app-rs74.onrender.com/home",
    featured: true,
  },
  {
    title: "Community Advocacy Website",
    desc: "Mobile-friendly website for the Monrovia, Indiana community board — campaign progress tracker, supporter counters, town hall countdown, and a categorized PDF library. Increased event attendance 40% and grassroots engagement 50%. Covered by WTHR-13 and CBS-4.",
    tags: ["HTML/CSS", "JavaScript", "Next.js"],
    gradient: "from-amber-950 via-orange-950 to-[#080808]",
    accent: "bg-amber-500/20 text-amber-300",
    num: "02",
    liveUrl: "https://protectmorgancounty.org/",
    featured: false,
  },
  {
    title: "Hotel Browser & Rating Search",
    desc: "JavaFX desktop app backed by an Oracle database — users search hotels by city and filter by ratings across cleanliness, service, location, and value. PL/SQL stored procedure computes ratings from raw review text via a seed-word extraction algorithm.",
    tags: ["Java", "JavaFX", "Oracle DB", "PL/SQL", "JDBC"],
    gradient: "from-purple-950 via-violet-950 to-[#080808]",
    accent: "bg-purple-500/20 text-purple-300",
    num: "03",
    liveUrl: "#",
    featured: false,
  },
  {
    title: "House Hunters Automation",
    desc: "Python script for sourcing homes for the TV show 'House Hunters' — parses 100+ daily MIBOR listings against buyer criteria (price range, rooms, preferences), reducing manual search time by 80% and improving matching accuracy by 25%.",
    tags: ["Python", "Pandas", "CSV", "Automation"],
    gradient: "from-green-950 via-emerald-950 to-[#080808]",
    accent: "bg-green-500/20 text-green-300",
    num: "04",
    liveUrl: "#",
    featured: false,
  },
  {
    title: "Gym Membership Database",
    desc: "Comprehensive SQL database for gym operations — member records, training sessions, equipment tracking, and automated membership expiration alerts. Reduced data retrieval time 25% through optimized table relationships and boosted timely renewals by 40%.",
    tags: ["SQL", "Database Design", "MySQL"],
    gradient: "from-red-950 via-rose-950 to-[#080808]",
    accent: "bg-red-500/20 text-red-300",
    num: "05",
    liveUrl: "#",
    featured: false,
  },
];

const SKILLS = [
  "JavaScript", "Python", "Java", "Swift", "SQL", "R",
  "React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS",
  "PostgreSQL", "MySQL", "MongoDB", "RESTful API",
  "Power BI", "Pandas", "jQuery", "Figma",
];

const TESTIMONIALS = [
  {
    quote:
      "Randy rebuilt our website from scratch and the results were immediate. We saw a 40% increase in contact form submissions within the first month.",
    name: "Sarah M.",
    role: "Owner, Bloom Boutique",
  },
  {
    quote:
      "Professional, fast, and communicates every step of the way. Our new site looks incredible on every device.",
    name: "Jake T.",
    role: "CEO, Northshore Media",
  },
  {
    quote:
      "I finally have a website I'm proud to share. Randy nailed our brand and delivered ahead of schedule.",
    name: "Priya K.",
    role: "Founder, Rootwork Studio",
  },
];

/* ─── Nav ──────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.05]"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0.5 select-none">
          <span className="font-syne font-extrabold text-xl tracking-tight text-white">
            Lane
          </span>
          <span className="font-syne font-extrabold text-xl tracking-tight text-blue-500">
            Dev
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Services", "Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-white/45 hover:text-white transition-colors duration-200 font-figtree"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Available badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs text-emerald-400 font-figtree font-medium">
            Available for work
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-1 text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.05]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {["Services", "Work", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/55 hover:text-white transition-colors font-figtree text-sm"
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400 font-figtree">
                  Available for work
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated orbs */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-[520px] h-[520px] rounded-full bg-blue-600/12 blur-[130px] pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, -35, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[10%] w-[420px] h-[420px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-7"
        >
          {/* Pill badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/8 border border-blue-500/18 text-blue-400 text-xs font-figtree font-medium tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Freelance Software &amp; Web Developer — Indiana
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-syne font-extrabold text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.93] tracking-tight text-white"
          >
            I Build Websites
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-violet-500">
              That Work as Hard
            </span>
            <br />
            as You Do.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg md:text-xl text-white/45 font-figtree leading-relaxed"
          >
            Freelance software &amp; web developer crafting fast, modern, and
            conversion-focused digital products for businesses that mean
            business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-figtree font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-600/20"
            >
              Let&apos;s Build Something
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
            <a
              href="#work"
              className="text-sm text-white/40 hover:text-white/80 transition-colors font-figtree"
            >
              See My Work ↓
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 pt-4 text-white/25 text-xs font-figtree"
          >
            <span>Next.js</span>
            <span className="text-white/10">·</span>
            <span>React</span>
            <span className="text-white/10">·</span>
            <span>TypeScript</span>
            <span className="text-white/10">·</span>
            <span>Node.js</span>
            <span className="text-white/10">·</span>
            <span>PostgreSQL</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}

/* ─── Services ─────────────────────────────────────────────── */
function Services() {
  const { ref, inView } = useReveal();

  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-[11px] font-figtree font-semibold text-blue-500 uppercase tracking-[0.18em]">
              What I Do
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-[3.2rem] leading-tight text-white mt-3">
              Services built to
              <br />
              move the needle.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ scale: 1.015, transition: { duration: 0.18 } }}
                className={`group relative p-8 rounded-2xl border border-white/[0.06] ${s.border} bg-gradient-to-br ${s.gradient} transition-all duration-300 cursor-default overflow-hidden`}
              >
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-blue-500/20" />

                <div className="p-2.5 rounded-xl bg-white/[0.05] w-fit text-blue-400 mb-5">
                  {s.icon}
                </div>
                <h3 className="font-syne font-bold text-xl text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-white/45 font-figtree text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Portfolio ────────────────────────────────────────────── */
function Portfolio() {
  const { ref, inView } = useReveal();

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-[11px] font-figtree font-semibold text-blue-500 uppercase tracking-[0.18em]">
              Selected Work
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-[3.2rem] leading-tight text-white mt-3">
              Projects that
              <br />
              speak for themselves.
            </h2>
          </motion.div>

          {/* Featured project — full width */}
          {featured.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col md:flex-row rounded-2xl border border-white/[0.06] bg-[#0d0d0d] overflow-hidden mb-5"
            >
              <div className={`relative md:w-2/5 h-56 md:h-auto bg-gradient-to-br ${p.gradient} overflow-hidden flex-shrink-0`}>
                <span className="absolute top-5 right-5 font-syne font-extrabold text-8xl text-white/[0.05] select-none leading-none">
                  {p.num}
                </span>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 rounded-md text-[11px] font-figtree font-medium ${p.accent} border border-white/[0.08]`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-7 md:p-10 flex flex-col flex-1 gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-figtree font-semibold uppercase tracking-widest ${p.accent} border border-white/[0.08]`}>
                    Featured
                  </span>
                </div>
                <h3 className="font-syne font-bold text-2xl text-white">{p.title}</h3>
                <p className="text-white/45 text-sm font-figtree leading-relaxed">{p.desc}</p>
                <div className="flex items-center gap-5 pt-2">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-figtree transition-colors">
                    <IconExternalLink /> Live Site
                  </a>
                  <a href="#" className="text-xs text-white/30 hover:text-white/65 font-figtree transition-colors">
                    Case Study →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Remaining projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
            {rest.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group flex flex-col rounded-2xl border border-white/[0.06] bg-[#0d0d0d] overflow-hidden"
              >
                <div className={`relative h-44 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <span className="absolute top-4 right-4 font-syne font-extrabold text-6xl text-white/[0.06] select-none leading-none">
                    {p.num}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={`px-1.5 py-0.5 rounded-md text-[10px] font-figtree font-medium ${p.accent} border border-white/[0.08]`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 gap-2.5">
                  <h3 className="font-syne font-bold text-base text-white leading-tight">{p.title}</h3>
                  <p className="text-white/38 text-xs font-figtree leading-relaxed flex-1 line-clamp-4">{p.desc}</p>

                  <div className="flex items-center gap-4 pt-3 border-t border-white/[0.05]">
                    <a
                      href={p.liveUrl !== "#" ? p.liveUrl : undefined}
                      target={p.liveUrl !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-figtree transition-colors ${p.liveUrl !== "#" ? "text-blue-400 hover:text-blue-300" : "text-white/20 cursor-default pointer-events-none"}`}
                    >
                      <IconExternalLink />
                      {p.liveUrl !== "#" ? "Live Site" : "Private"}
                    </a>
                    <a
                      href="#"
                      className="text-xs text-white/30 hover:text-white/65 font-figtree transition-colors"
                    >
                      Case Study →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────────── */
function About() {
  const { ref, inView } = useReveal();

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start"
        >
          {/* Bio */}
          <motion.div variants={fadeUp} className="space-y-7">
            <div>
              <span className="text-[11px] font-figtree font-semibold text-blue-500 uppercase tracking-[0.18em]">
                About
              </span>
              <h2 className="font-syne font-extrabold text-4xl md:text-[3.2rem] leading-tight text-white mt-3">
                Hey, I&apos;m Randy.
              </h2>
            </div>

            <div className="space-y-4 text-white/50 font-figtree leading-[1.8] text-[15px]">
              <p>
                I&apos;m a Purdue University graduate and freelance software
                &amp; web developer based in Indiana. My degree in Computer
                &amp; Information Technology gave me a rigorous foundation in
                software engineering, data systems, and problem-solving, and
                that background shows in everything I build.
              </p>
              <p>
                I work with small businesses and startups that want a serious
                online presence without agency prices. Clean code, fast load
                times, and designs that convert. That&apos;s the standard I
                hold every project to, whether it&apos;s a landing page, a
                full business site, or a custom web app.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-blue-400 flex-shrink-0">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <div>
                <p className="text-white/80 text-xs font-figtree font-medium">Purdue University</p>
                <p className="text-white/35 text-[11px] font-figtree">B.S. Computer &amp; Information Technology: Data Management</p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-figtree transition-colors"
            >
              Work with me <IconArrow />
            </a>
          </motion.div>

          {/* Skills */}
          <motion.div variants={fadeUp} className="space-y-5">
            <span className="text-[11px] font-figtree font-semibold text-white/25 uppercase tracking-[0.18em]">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.04 }}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:border-blue-500/25 hover:text-white text-white/60 text-sm font-figtree transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="pt-4 grid grid-cols-2 gap-4">
              {[
                { value: "Purdue", label: "CS Graduate" },
                { value: "10+", label: "Projects shipped" },
                { value: "Full", label: "Stack developer" },
                { value: "∞", label: "Attention to detail" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <p className="font-syne font-bold text-2xl text-white">
                    {stat.value}
                  </p>
                  <p className="text-white/35 font-figtree text-xs mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─────────────────────────────────────────── */
function Testimonials() {
  const { ref, inView } = useReveal();

  return (
    <section id="testimonials" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-[11px] font-figtree font-semibold text-blue-500 uppercase tracking-[0.18em]">
              Testimonials
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-[3.2rem] leading-tight text-white mt-3">
              What clients say.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-5 p-7 rounded-2xl bg-[#0d0d0d] border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-300"
              >
                {/* Quote mark */}
                <svg
                  viewBox="0 0 32 22"
                  fill="currentColor"
                  className="w-7 h-auto text-blue-500/30"
                >
                  <path d="M0 22V13.2C0 5.87 4.77 1.47 14.3 0l1.47 2.57C10.67 3.67 7.7 6.23 7 10.27H12.83V22H0zm19.17 0V13.2C19.17 5.87 23.93 1.47 33.47 0l1.47 2.57c-5.1 1.1-8.07 3.66-8.77 7.7H32V22H19.17z" />
                </svg>

                <p className="text-white/55 font-figtree text-sm leading-relaxed flex-1">
                  {t.quote}
                </p>

                <div className="pt-5 border-t border-white/[0.05]">
                  <p className="text-white font-figtree font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-white/30 font-figtree text-xs mt-0.5">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-[#0d0d0d] border border-white/[0.07] focus:border-blue-500/50 text-white placeholder-white/18 font-figtree text-sm focus:outline-none transition-colors duration-200";

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-[11px] font-figtree font-semibold text-blue-500 uppercase tracking-[0.18em]">
              Get In Touch
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-[3.2rem] leading-tight text-white mt-3">
              Let&apos;s Build
              <br />
              Something Great.
            </h2>
            <p className="text-white/40 font-figtree mt-4 text-[15px]">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-figtree font-semibold text-white/25 uppercase tracking-[0.14em]">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-figtree font-semibold text-white/25 uppercase tracking-[0.14em]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-figtree font-semibold text-white/25 uppercase tracking-[0.14em]">
                Message
              </label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project — what are you building, what's your timeline, and what would a win look like?"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.99 : 1 }}
              className={`w-full py-4 font-figtree font-semibold rounded-xl transition-colors text-sm shadow-lg ${
                status === "sent"
                  ? "bg-emerald-600 text-white shadow-emerald-600/15 cursor-default"
                  : status === "error"
                  ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/15"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/15 disabled:opacity-60"
              }`}
            >
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message sent — I'll be in touch soon ✓"}
              {status === "error" && "Something went wrong — try again"}
              {status === "idle" && "Send Message →"}
            </motion.button>

            <p className="text-center text-[11px] text-white/20 font-figtree">
              Or email directly at{" "}
              <a
                href="mailto:dj23lane@gmail.com"
                className="text-blue-500/60 hover:text-blue-400 transition-colors"
              >
                dj23lane@gmail.com
              </a>
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-0.5">
            <span className="font-syne font-extrabold text-white text-lg">
              Lane
            </span>
            <span className="font-syne font-extrabold text-blue-500 text-lg">
              Dev
            </span>
          </div>
          <span className="text-[11px] text-white/20 font-figtree">
            © 2026 LaneDev. Built with Next.js.
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          {["Services", "Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs text-white/25 hover:text-white/70 transition-colors font-figtree"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/randylane-317"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg text-white/25 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            aria-label="GitHub"
          >
            <IconGitHub />
          </a>
          <a
            href="https://linkedin.com/in/randy-lane-8918392b1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg text-white/25 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            aria-label="LinkedIn"
          >
            <IconLinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <Nav />
      <Hero />
      <Divider />
      <Services />
      <Divider />
      <Portfolio />
      <Divider />
      <About />
      <Divider />
      <Testimonials />
      <Divider />
      <Contact />
      <Footer />
    </main>
  );
}
