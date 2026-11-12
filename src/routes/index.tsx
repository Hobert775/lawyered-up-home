import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Scale, ArrowRight, CheckCircle2, Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import attorney1 from "@/assets/attorney-1.jpg";
import attorney2 from "@/assets/attorney-2.jpg";
import attorney3 from "@/assets/attorney-3.jpg";
import attorney4 from "@/assets/attorney-4.jpg";
import brandMark from "@/assets/brand-mark.png";
import {
  useSiteData,
  addInquiry,
  type SiteContactInfo,
  type PracticeAreaItem,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Summit Legal Advocates — Trusted Legal Counsel",
      },
      {
        name: "description",
        content:
          "Summit Legal Advocates provides professional, confidential, client-focused legal services for individuals and businesses. Schedule a consultation today.",
      },
      {
        property: "og:title",
        content: "Summit Legal Advocates — Trusted Legal Counsel",
      },
      {
        property: "og:description",
        content:
          "Summit Legal Advocates provides professional, confidential, client-focused legal services for individuals and businesses. Schedule a consultation today.",
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
  const { contactInfo, practiceAreas } = useSiteData();

  return (
    <div id="home" className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader firmName={contactInfo.firmName} />
      <main>
        <HeroSection contactInfo={contactInfo} />
        <PracticeAreasSection practiceAreas={practiceAreas} />
        <WhyChooseUsSection />
        <AttorneysSection />
        <CtaSection />
        <ContactSection contactInfo={contactInfo} practiceAreas={practiceAreas} />
      </main>
      <SiteFooter firmName={contactInfo.firmName} />
    </div>
  );
}

function SiteHeader({ firmName }: { firmName: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={brandMark}
            alt="Civil Law Firm emblem"
            width={36}
            height={36}
            loading="lazy"
            className="size-9 shrink-0"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-wide text-foreground">
              {firmName.toUpperCase()}
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

function HeroSection({ contactInfo }: { contactInfo: SiteContactInfo }) {
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
          <p className="kicker">{contactInfo.tagline}</p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-gold-gradient italic">{contactInfo.firmName}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {contactInfo.description}
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

function PracticeAreasSection({ practiceAreas }: { practiceAreas: PracticeAreaItem[] }) {
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
            {practiceAreas.length} Disciplines
          </span>
        </div>
        <div className="mt-2 grid gap-x-12 sm:grid-cols-2">
          {practiceAreas.map((area, index) => (
            <div
              key={area.id || area.name}
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

function AttorneysSection() {
  return (
    <section id="attorneys" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="kicker">Our Attorneys</p>
            <h2 className="mt-3 max-w-[28ch] font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Meet the counsel behind every result.
            </h2>
          </div>
          <span className="hidden shrink-0 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
            Ready to Serve You
          </span>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ATTORNEYS.map((attorney) => (
            <article key={attorney.name} className="group">
              <div className="relative overflow-hidden rounded-sm border border-border">
                <img
                  src={attorney.photo}
                  alt={`${attorney.name}, ${attorney.role}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-primary">
                {attorney.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {attorney.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {attorney.focus}
              </p>
            </article>
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

function ContactSection({
  contactInfo,
  practiceAreas,
}: {
  contactInfo: SiteContactInfo;
  practiceAreas: PracticeAreaItem[];
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceArea: practiceAreas[0]?.name || "Civil & Commercial Law",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      practiceArea: formData.practiceArea,
      message: formData.message,
    });

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      practiceArea: practiceAreas[0]?.name || "Civil & Commercial Law",
      message: "",
    });
  };

  const contactItems = [
    { label: "Office Address", value: contactInfo.address, icon: MapPin },
    { label: "Phone Number", value: contactInfo.phone, icon: Phone },
    { label: "Email Address", value: contactInfo.email, icon: Mail },
    { label: "Business Hours", value: contactInfo.businessHours, icon: Clock },
  ];

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5">
            <p className="kicker">Confidential Counsel</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {contactInfo.firmName}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {contactInfo.consultationNotice}
            </p>

            <dl className="mt-8 space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3.5 border-l-2 border-primary/40 pl-4">
                  <item.icon className="size-4 shrink-0 mt-1 text-primary" />
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-base text-foreground">
                      {item.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-2xl font-medium tracking-tight">
                Submit an Inquiry
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                All communications are protected under strict attorney-client privilege.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-sm border border-primary/40 bg-primary/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto size-10 text-primary" />
                  <h4 className="mt-3 font-display text-lg font-semibold text-foreground">
                    Inquiry Received
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Thank you for reaching out. Your legal matter has been delivered
                    confidentially to our counsel team. We will review the details and contact you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-gold-outline mt-5 text-xs !py-2 !px-4"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Robert Sterling"
                        className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. robert@example.com"
                        className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Practice Area of Inquiry
                      </label>
                      <select
                        value={formData.practiceArea}
                        onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                        className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                      >
                        {practiceAreas.map((pa) => (
                          <option key={pa.id || pa.name} value={pa.name}>
                            {pa.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Case Details & Inquiry Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your situation, legal questions, or required services..."
                      className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold mt-2 w-full text-xs font-semibold !py-3"
                  >
                    <Send className="size-3.5" />
                    <span>Send Confidential Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ firmName }: { firmName: string }) {
  return (
    <footer className="border-t border-border bg-ink-deep">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-2.5">
            <Scale className="size-4 text-primary" strokeWidth={1.75} />
            <span className="font-display text-sm font-semibold tracking-wide">
              {firmName.toUpperCase()}
            </span>
          </span>
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {firmName}. All rights reserved.
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
