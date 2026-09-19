import { createFileRoute } from "@tanstack/react-router";
import { Scale, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import attorney1 from "@/assets/attorney-1.jpg";
import attorney2 from "@/assets/attorney-2.jpg";
import attorney3 from "@/assets/attorney-3.jpg";
import attorney4 from "@/assets/attorney-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Civil Law Firm — Trusted Legal Counsel. Strong Representation.",
      },
      {
        name: "description",
        content:
          "Civil Law Firm provides professional, confidential, and client-focused legal services to individuals, businesses, and organizations. Schedule a consultation today.",
      },
      {
        property: "og:title",
        content: "Civil Law Firm — Trusted Legal Counsel. Strong Representation.",
      },
      {
        property: "og:description",
        content:
          "Professional, confidential, and client-focused legal services for individuals, businesses, and organizations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Practice Areas", href: "#practice" },
  { label: "Our Attorneys", href: "#attorneys" },
  { label: "Services", href: "#practice" },
  { label: "Contact", href: "#contact" },
];

const PRACTICE_AREAS = [
  {
    name: "Civil & Commercial Law",
    blurb: "Contracts, disputes, and commercial relationships handled with care.",
  },
  {
    name: "Criminal Defense",
    blurb: "Vigorous, discreet defense protecting your liberty and reputation.",
  },
  {
    name: "Family & Matrimonial Law",
    blurb: "Compassionate guidance through divorce, custody, and support matters.",
  },
  {
    name: "Corporate & Business Law",
    blurb: "Formation, governance, and transactions for growing enterprises.",
  },
  {
    name: "Real Estate & Property Law",
    blurb: "Closings, leases, and title matters resolved with precision.",
  },
  {
    name: "Immigration Law",
    blurb: "Visas, residency, and citizenship pursued methodically.",
  },
  {
    name: "Estate Planning & Probate",
    blurb: "Wills, trusts, and estates planned for the generations ahead.",
  },
  {
    name: "Litigation & Dispute Resolution",
    blurb: "Trial-ready advocacy and strategic settlement solutions.",
  },
];

const WHY_POINTS = [
  {
    name: "Professionalism",
    blurb: "Experienced and dedicated legal representation.",
  },
  {
    name: "Integrity",
    blurb: "Honest, ethical, and confidential service.",
  },
  {
    name: "Personal Attention",
    blurb: "Every matter receives careful individual attention.",
  },
  {
    name: "Results-Focused",
    blurb: "Strategic solutions designed around each client's objectives.",
  },
];

const ATTORNEYS = [
  {
    photo: attorney1,
    name: "James Whitfield",
    role: "Managing Partner",
    focus: "Civil & Commercial Law · Litigation",
  },
  {
    photo: attorney2,
    name: "Elena Marchetti",
    role: "Senior Partner",
    focus: "Family & Matrimonial Law · Estate Planning",
  },
  {
    photo: attorney3,
    name: "Marcus Bennett",
    role: "Associate Attorney",
    focus: "Criminal Defense · Immigration Law",
  },
  {
    photo: attorney4,
    name: "Priya Raghavan",
    role: "Senior Associate",
    focus: "Corporate & Business Law · Real Estate",
  },
];

function Index() {
  return (
    <div id="home" className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <PracticeAreasSection />
        <WhyChooseUsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <Scale className="size-5" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-wide text-foreground">
              CIVIL LAW FIRM
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-primary">
              Attorneys at Law
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-[13px] font-medium text-muted-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-gold hidden !px-5 !py-2 text-sm sm:inline-flex">
          Consultation
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="about" className="relative isolate overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1024}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/60"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-36">
        <div className="max-w-2xl">
          <p className="kicker">
            Trusted Legal Counsel &middot; Strong Representation &middot; Proven Commitment
          </p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-gold-gradient italic">Civil Law Firm</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            At Civil Law Firm, we provide professional, confidential, and
            client-focused legal services to individuals, businesses, and
            organizations. Our firm is committed to protecting our
            clients&rsquo; rights and providing practical legal solutions
            tailored to their needs.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-gold text-sm">
              Schedule a Consultation
            </a>
            <a href="#contact" className="btn-gold-outline group text-sm">
              Contact Us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeAreasSection() {
  return (
    <section id="practice" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="kicker">Our Practice Areas</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Counsel across every matter that matters.
            </h2>
          </div>
          <span className="hidden shrink-0 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
            Eight Disciplines
          </span>
        </div>
        <div className="mt-2 grid gap-x-12 sm:grid-cols-2">
          {PRACTICE_AREAS.map((area, index) => (
            <div
              key={area.name}
              className="group flex items-baseline gap-5 border-b border-border py-6"
            >
              <span className="w-8 shrink-0 font-display text-sm font-medium text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-primary">
                  {area.name}
                </h3>
                <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                  {area.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section id="why" className="border-t border-border bg-ink-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="kicker">Why Choose Us</p>
        <h2 className="mt-3 max-w-[30ch] font-display text-3xl font-medium tracking-tight sm:text-4xl">
          The standard our clients return to, again and again.
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_POINTS.map((point, index) => (
            <div key={point.name} className="border-t border-primary/30 pt-6">
              <span className="font-display text-sm font-medium text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight">
                {point.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {point.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="cta" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid items-center gap-10 rounded-sm border border-primary/30 bg-card p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="kicker">Speak With a Lawyer</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Your situation deserves careful counsel.
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-muted-foreground">
              Whether you need legal advice, representation, or assistance with
              an ongoing matter, our team is available to discuss your
              situation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a href="#contact" className="btn-gold text-sm">
              Schedule a Consultation
            </a>
            <a href="#contact" className="btn-gold-outline group text-sm">
              Contact Us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactItems = [
    { label: "Office Address", value: "[Office Address]" },
    { label: "Phone Number", value: "[Phone Number]" },
    { label: "Email Address", value: "[Email Address]" },
    { label: "Business Hours", value: "[Business Hours]" },
  ];

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Civil Law Firm
            </h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-muted-foreground">
              Reach out to discuss your matter. Every inquiry is treated with
              strict confidence.
            </p>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2">
            {contactItems.map((item) => (
              <div key={item.label} className="border-l-2 border-primary/40 pl-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink-deep">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-2.5">
            <Scale className="size-4 text-primary" strokeWidth={1.75} />
            <span className="font-display text-sm font-semibold tracking-wide">
              CIVIL LAW FIRM
            </span>
          </span>
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Civil Law Firm. All rights reserved.
          </span>
        </div>
        <p className="mt-6 max-w-[72ch] text-xs leading-relaxed text-muted-foreground">
          The information provided on this website is for general informational
          purposes and does not constitute legal advice or create an
          attorney-client relationship.
        </p>
      </div>
    </footer>
  );
}
