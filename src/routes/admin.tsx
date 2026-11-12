import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Scale,
  Shield,
  Lock,
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
  Search,
  ExternalLink,
  LogOut,
  Plus,
  Save,
  RotateCcw,
  User,
  Building,
  Briefcase,
  AlertCircle,
  FileText,
  Download,
} from "lucide-react";
import {
  useSiteData,
  saveSiteContactInfo,
  updateInquiryStatus,
  updateInquiryNotes,
  deleteInquiry,
  savePracticeAreas,
  getAdminPassword,
  saveAdminPassword,
  setAdminAuthenticated,
  resetSiteDataToDefaults,
  type InquiryItem,
  type SiteContactInfo,
  type PracticeAreaItem,
} from "@/lib/site-data";
import brandMark from "@/assets/brand-mark.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Summit Legal Advocates" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { contactInfo, inquiries, practiceAreas, isAuthenticated } = useSiteData();

  if (!isAuthenticated) {
    return <AdminLoginScreen />;
  }

  return (
    <AdminDashboard
      contactInfo={contactInfo}
      inquiries={inquiries}
      practiceAreas={practiceAreas}
    />
  );
}

function AdminLoginScreen() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = getAdminPassword();
    if (username.trim() === "admin" && password === validPassword) {
      setError(null);
      setAdminAuthenticated(true, remember);
    } else {
      setError("Invalid username or password. Default is admin / admin123");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-sm border border-primary/30 bg-card p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Shield className="size-7 text-primary" />
          </div>
          <p className="kicker mt-5">Administration Portal</p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
            Summit Legal Advocates
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Confidential Client Inquiries & Website Management Console
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Username
            </label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-sm border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-sm border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground hover:cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-border bg-background text-primary focus:ring-primary"
              />
              Remember on this browser
            </label>
            <span className="text-[11px] text-muted-foreground">Default: admin123</span>
          </div>

          <button
            type="submit"
            className="btn-gold mt-2 w-full text-sm font-semibold !py-2.5"
          >
            Access Portal
          </button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({
  contactInfo,
  inquiries,
  practiceAreas,
}: {
  contactInfo: SiteContactInfo;
  inquiries: InquiryItem[];
  practiceAreas: PracticeAreaItem[];
}) {
  const [activeTab, setActiveTab] = useState<"inquiries" | "contact" | "practice" | "security">("inquiries");

  const newCount = useMemo(
    () => inquiries.filter((inq) => inq.status === "new").length,
    [inquiries]
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src={brandMark}
              alt="Civil Law Firm emblem"
              width={32}
              height={32}
              className="size-8 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold tracking-wide text-foreground">
                  {contactInfo.firmName}
                </span>
                <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Admin Console
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Inquiry & Content Control Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="size-3.5" />
            </Link>

            <button
              onClick={() => setAdminAuthenticated(false)}
              className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="size-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-border/60 bg-card">
          <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-8">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === "inquiries"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="size-4" />
              <span>Website Inquiries</span>
              {newCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {newCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === "contact"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building className="size-4" />
              <span>Contact & Firm Info</span>
            </button>

            <button
              onClick={() => setActiveTab("practice")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === "practice"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="size-4" />
              <span>Practice Areas</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-medium uppercase tracking-wider transition-colors ${
                activeTab === "security"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Lock className="size-4" />
              <span>Security</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {activeTab === "inquiries" && <InquiriesTab inquiries={inquiries} />}
        {activeTab === "contact" && <ContactInfoTab currentInfo={contactInfo} />}
        {activeTab === "practice" && <PracticeAreasTab areas={practiceAreas} />}
        {activeTab === "security" && <SecurityTab />}
      </main>
    </div>
  );
}

/* ========================================================================= */
/* TAB 1: CLIENT INQUIRIES MANAGEMENT                                        */
/* ========================================================================= */
function InquiriesTab({ inquiries }: { inquiries: InquiryItem[] }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = filterStatus === "all" || inq.status === filterStatus;
      const term = search.toLowerCase();
      const matchesSearch =
        inq.name.toLowerCase().includes(term) ||
        inq.email.toLowerCase().includes(term) ||
        inq.phone.toLowerCase().includes(term) ||
        inq.message.toLowerCase().includes(term) ||
        inq.practiceArea.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, search, filterStatus]);

  const exportCSV = () => {
    const headers = ["ID,Created At,Name,Email,Phone,Practice Area,Status,Message,Notes"];
    const rows = inquiries.map((inq) =>
      [
        `"${inq.id}"`,
        `"${inq.createdAt}"`,
        `"${inq.name}"`,
        `"${inq.email}"`,
        `"${inq.phone}"`,
        `"${inq.practiceArea}"`,
        `"${inq.status}"`,
        `"${inq.message.replace(/"/g, '""')}"`,
        `"${(inq.notes || "").replace(/"/g, '""')}"`,
      ].join(",")
    );
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lawfirm-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: InquiryItem["status"]) => {
    switch (status) {
      case "new":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "contacted":
        return "bg-primary/15 text-primary border-primary/30";
      case "resolved":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "archived":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Client Inquiries & Consultation Requests
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage incoming messages submitted from the website contact & consultation form.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Download className="size-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="grid gap-4 sm:grid-cols-12">
        <div className="relative sm:col-span-6 lg:col-span-7">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, phone, or matter details..."
            className="w-full rounded-sm border border-border bg-card py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:col-span-6 lg:col-span-5 lg:justify-end">
          {["all", "new", "contacted", "resolved", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                filterStatus === st
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <div className="rounded-sm border border-border bg-card p-12 text-center">
          <Mail className="mx-auto size-10 text-muted-foreground/40" />
          <h3 className="mt-4 font-display text-lg font-medium text-foreground">
            No inquiries found
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {search || filterStatus !== "all"
              ? "Try adjusting your search filters."
              : "Inquiries submitted via the website contact form will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className={`rounded-sm border bg-card p-5 transition-all ${
                inq.status === "new"
                  ? "border-primary/40 shadow-sm shadow-primary/5"
                  : "border-border"
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {inq.name}
                    </h3>
                    <span
                      className={`rounded-sm border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getStatusBadge(
                        inq.status
                      )}`}
                    >
                      {inq.status}
                    </span>
                    <span className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {inq.practiceArea}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <a
                      href={`mailto:${inq.email}`}
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Mail className="size-3.5" />
                      <span>{inq.email}</span>
                    </a>
                    <a
                      href={`tel:${inq.phone}`}
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Phone className="size-3.5" />
                      <span>{inq.phone}</span>
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{new Date(inq.createdAt).toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      updateInquiryStatus(inq.id, e.target.value as InquiryItem["status"])
                    }
                    className="rounded-sm border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="new">Mark as New</option>
                    <option value="contacted">Mark as Contacted</option>
                    <option value="resolved">Mark as Resolved</option>
                    <option value="archived">Mark as Archived</option>
                  </select>

                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this inquiry?")) {
                        deleteInquiry(inq.id);
                      }
                    }}
                    title="Delete inquiry"
                    className="rounded-sm border border-border p-1.5 text-muted-foreground hover:border-destructive/40 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="mt-4 rounded-sm border border-border/60 bg-background/50 p-4 text-sm leading-relaxed text-foreground">
                <p className="font-sans whitespace-pre-wrap">{inq.message}</p>
              </div>

              {/* Staff Internal Notes */}
              <div className="mt-3">
                {editingNotesId === inq.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      placeholder="Add internal counsel notes..."
                      className="w-full rounded-sm border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        updateInquiryNotes(inq.id, notesValue);
                        setEditingNotesId(null);
                      }}
                      className="btn-gold !px-3 !py-1.5 text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="rounded-sm border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="italic">
                      {inq.notes ? `Staff Note: "${inq.notes}"` : "No internal notes added."}
                    </span>
                    <button
                      onClick={() => {
                        setEditingNotesId(inq.id);
                        setNotesValue(inq.notes || "");
                      }}
                      className="text-primary hover:underline"
                    >
                      {inq.notes ? "Edit note" : "+ Add note"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* TAB 2: CONTACT & FIRM INFO SETTINGS                                       */
/* ========================================================================= */
function ContactInfoTab({ currentInfo }: { currentInfo: SiteContactInfo }) {
  const [formData, setFormData] = useState<SiteContactInfo>(currentInfo);
  const [savedToast, setSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteContactInfo(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset all contact & inquiry information to default values?")) {
      resetSiteDataToDefaults();
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Website Contact & Inquiry Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Changes made here update the public homepage contact section and branding immediately.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <CheckCircle2 className="size-4" />
            <span>Saved to live website!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-sm border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Firm Name
            </label>
            <input
              type="text"
              required
              value={formData.firmName}
              onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
              className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Primary Phone Number
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Primary Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Business / Consultation Hours
            </label>
            <input
              type="text"
              required
              value={formData.businessHours}
              onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
              className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Office Physical Address
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hero Tagline / Subtitle
          </label>
          <input
            type="text"
            required
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Homepage Overview & About Description
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Inquiry & Consultation Notice / Disclaimer
          </label>
          <textarea
            rows={2}
            required
            value={formData.consultationNotice}
            onChange={(e) => setFormData({ ...formData, consultationNotice: e.target.value })}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <button type="submit" className="btn-gold text-sm font-semibold !py-2.5 !px-6">
            <Save className="size-4" />
            <span>Save & Apply to Website</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset to defaults</span>
          </button>
        </div>
      </form>
    </div>
  );
}

/* ========================================================================= */
/* TAB 3: PRACTICE AREAS CONTROL                                             */
/* ========================================================================= */
function PracticeAreasTab({ areas }: { areas: PracticeAreaItem[] }) {
  const [items, setItems] = useState<PracticeAreaItem[]>(areas);
  const [newName, setNewName] = useState("");
  const [newBlurb, setNewBlurb] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newItem: PracticeAreaItem = {
      id: "area-" + Date.now(),
      name: newName.trim(),
      blurb: newBlurb.trim() || "Professional legal representation and strategic counsel.",
    };
    const updated = [...items, newItem];
    setItems(updated);
    savePracticeAreas(updated);
    setNewName("");
    setNewBlurb("");
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this practice area from the homepage?")) {
      const updated = items.filter((item) => item.id !== id);
      setItems(updated);
      savePracticeAreas(updated);
    }
  };

  const handleUpdate = (id: string, name: string, blurb: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, name, blurb } : item));
    setItems(updated);
    savePracticeAreas(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Practice Areas Management
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure the legal services and disciplines presented on the website.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 rounded-sm border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <CheckCircle2 className="size-4" />
            <span>Updated!</span>
          </div>
        )}
      </div>

      {/* Add New Area */}
      <form onSubmit={handleAdd} className="rounded-sm border border-primary/30 bg-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
          + Add New Practice Discipline
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            required
            placeholder="Discipline Name (e.g. Maritime Law)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded-sm border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Short description of services..."
            value={newBlurb}
            onChange={(e) => setNewBlurb(e.target.value)}
            className="rounded-sm border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
          />
        </div>
        <button type="submit" className="btn-gold mt-3 text-xs font-semibold !py-2 !px-4">
          <Plus className="size-3.5" />
          <span>Add Practice Area</span>
        </button>
      </form>

      {/* Existing List */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-sm border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4 flex-1">
              <span className="font-display text-sm font-semibold text-primary">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="space-y-1 flex-1">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdate(item.id, e.target.value, item.blurb)}
                  className="font-display font-medium text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none w-full text-base"
                />
                <input
                  type="text"
                  value={item.blurb}
                  onChange={(e) => handleUpdate(item.id, item.name, e.target.value)}
                  className="text-xs text-muted-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none w-full"
                />
              </div>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-muted-foreground hover:text-destructive self-end sm:self-center transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* TAB 4: SECURITY SETTINGS                                                  */
/* ========================================================================= */
function SecurityTab() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = getAdminPassword();
    if (currentPass !== stored) {
      setMsg({ text: "Current password does not match.", error: true });
      return;
    }
    if (newPass.length < 6) {
      setMsg({ text: "New password must be at least 6 characters.", error: true });
      return;
    }
    if (newPass !== confirmPass) {
      setMsg({ text: "New password and confirmation do not match.", error: true });
      return;
    }

    saveAdminPassword(newPass);
    setMsg({ text: "Admin password successfully updated!", error: false });
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Admin Portal Security
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your administrator credentials for accessing this portal.
        </p>
      </div>

      <form onSubmit={handlePasswordChange} className="space-y-4 rounded-sm border border-border bg-card p-6">
        {msg && (
          <div
            className={`flex items-center gap-2 rounded-sm border p-3 text-xs ${
              msg.error
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-primary/40 bg-primary/10 text-primary"
            }`}
          >
            {msg.error ? <AlertCircle className="size-4 shrink-0" /> : <CheckCircle2 className="size-4 shrink-0" />}
            <span>{msg.text}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Current Password
          </label>
          <input
            type="password"
            required
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            New Password
          </label>
          <input
            type="password"
            required
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Confirm New Password
          </label>
          <input
            type="password"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-gold mt-2 w-full text-xs font-semibold !py-2.5">
          Update Password
        </button>
      </form>
    </div>
  );
}
