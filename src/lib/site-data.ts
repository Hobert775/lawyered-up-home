import { useState, useEffect } from "react";

export interface InquiryItem {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  practiceArea: string;
  message: string;
  status: "new" | "contacted" | "resolved" | "archived";
  notes?: string;
}

export interface SiteContactInfo {
  firmName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  consultationNotice: string;
}

export interface PracticeAreaItem {
  id: string;
  name: string;
  blurb: string;
}

export interface AttorneyItem {
  id: string;
  name: string;
  role: string;
  focus: string;
}

const STORAGE_KEYS = {
  CONTACT: "lawfirm_site_contact_info",
  INQUIRIES: "lawfirm_inquiries",
  PRACTICE_AREAS: "lawfirm_practice_areas",
  ATTORNEYS: "lawfirm_attorneys",
  AUTH: "lawfirm_admin_authenticated",
  PASSWORD: "lawfirm_admin_password",
};

const DEFAULT_CONTACT_INFO: SiteContactInfo = {
  firmName: "Summit Legal Advocates",
  tagline: "Trusted Legal Counsel · Strong Representation · Proven Commitment",
  description:
    "At Summit Legal Advocates, we provide professional, confidential, and client-focused legal services to individuals, businesses, and organizations. Our firm is committed to protecting our clients' rights and providing practical legal solutions tailored to their needs.",
  address: "63 22B St - Port Saeed - Dubai - United Arab Emirates",
  phone: "+971 4 123 4567",
  email: "contact@summitlegaladvocates.ae",
  businessHours: "24 Hours / 7 Days Consultation Support",
  consultationNotice:
    "Reach out to discuss your matter. Every inquiry is treated with strict attorney-client privilege and confidentiality.",
};

const DEFAULT_PRACTICE_AREAS: PracticeAreaItem[] = [
  {
    id: "1",
    name: "Civil & Commercial Law",
    blurb: "Contracts, disputes, and commercial relationships handled with care.",
  },
  {
    id: "2",
    name: "Criminal Defense",
    blurb: "Vigorous, discreet defense protecting your liberty and reputation.",
  },
  {
    id: "3",
    name: "Family & Matrimonial Law",
    blurb: "Compassionate guidance through divorce, custody, and support matters.",
  },
  {
    id: "4",
    name: "Corporate & Business Law",
    blurb: "Formation, governance, and transactions for growing enterprises.",
  },
  {
    id: "5",
    name: "Real Estate & Property Law",
    blurb: "Closings, leases, and title matters resolved with precision.",
  },
  {
    id: "6",
    name: "Immigration Law",
    blurb: "Visas, residency, and citizenship pursued methodically.",
  },
  {
    id: "7",
    name: "Estate Planning & Probate",
    blurb: "Wills, trusts, and estates planned for the generations ahead.",
  },
  {
    id: "8",
    name: "Litigation & Dispute Resolution",
    blurb: "Trial-ready advocacy and strategic settlement solutions.",
  },
];

const DEFAULT_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-1",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: "Alexander Vance",
    email: "a.vance@example.com",
    phone: "+971 50 234 5678",
    practiceArea: "Corporate & Business Law",
    message: "We are seeking corporate counsel to assist with cross-border trade structuring and contract negotiations in Dubai.",
    status: "new",
    notes: "Requires quick turnaround on draft contracts.",
  },
  {
    id: "inq-2",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+971 55 987 6543",
    practiceArea: "Real Estate & Property Law",
    message: "Looking for legal advisory regarding commercial lease arbitration and property acquisition diligence.",
    status: "contacted",
    notes: "Consultation call scheduled for Thursday 2 PM.",
  },
  {
    id: "inq-3",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: "Dr. Tariq Mansoor",
    email: "t.mansoor@example.com",
    phone: "+971 52 112 3344",
    practiceArea: "Civil & Commercial Law",
    message: "Dispute resolution regarding partnership asset distribution. Need urgent confidential assessment.",
    status: "resolved",
    notes: "Matter referred to Managing Partner James Whitfield.",
  },
];

function notifySubscribers() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("lawfirm_site_data_updated"));
  }
}

export function getSiteContactInfo(): SiteContactInfo {
  if (typeof window === "undefined") return DEFAULT_CONTACT_INFO;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return raw ? { ...DEFAULT_CONTACT_INFO, ...JSON.parse(raw) } : DEFAULT_CONTACT_INFO;
  } catch {
    return DEFAULT_CONTACT_INFO;
  }
}

export function saveSiteContactInfo(info: SiteContactInfo): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(info));
  notifySubscribers();
}

export function getInquiries(): InquiryItem[] {
  if (typeof window === "undefined") return DEFAULT_INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INQUIRIES;
  }
}

export function addInquiry(
  item: Omit<InquiryItem, "id" | "createdAt" | "status">
): InquiryItem {
  const current = getInquiries();
  const newItem: InquiryItem = {
    ...item,
    id: "inq-" + Date.now(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const updated = [newItem, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifySubscribers();
  }
  return newItem;
}

export function updateInquiryStatus(id: string, status: InquiryItem["status"]): void {
  const current = getInquiries();
  const updated = current.map((inq) => (inq.id === id ? { ...inq, status } : inq));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifySubscribers();
  }
}

export function updateInquiryNotes(id: string, notes: string): void {
  const current = getInquiries();
  const updated = current.map((inq) => (inq.id === id ? { ...inq, notes } : inq));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifySubscribers();
  }
}

export function deleteInquiry(id: string): void {
  const current = getInquiries();
  const updated = current.filter((inq) => inq.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifySubscribers();
  }
}

export function getPracticeAreas(): PracticeAreaItem[] {
  if (typeof window === "undefined") return DEFAULT_PRACTICE_AREAS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE_AREAS);
    return raw ? JSON.parse(raw) : DEFAULT_PRACTICE_AREAS;
  } catch {
    return DEFAULT_PRACTICE_AREAS;
  }
}

export function savePracticeAreas(areas: PracticeAreaItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.PRACTICE_AREAS, JSON.stringify(areas));
  notifySubscribers();
}

export function getAdminPassword(): string {
  if (typeof window === "undefined") return "admin123";
  return localStorage.getItem(STORAGE_KEYS.PASSWORD) || "admin123";
}

export function saveAdminPassword(password: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.PASSWORD, password);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return (
    sessionStorage.getItem(STORAGE_KEYS.AUTH) === "true" ||
    localStorage.getItem(STORAGE_KEYS.AUTH) === "true"
  );
}

export function setAdminAuthenticated(val: boolean, remember = false): void {
  if (typeof window === "undefined") return;
  if (val) {
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.AUTH, "true");
    } else {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, "true");
    }
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
  notifySubscribers();
}

export function resetSiteDataToDefaults(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(DEFAULT_CONTACT_INFO));
  localStorage.setItem(STORAGE_KEYS.PRACTICE_AREAS, JSON.stringify(DEFAULT_PRACTICE_AREAS));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
  notifySubscribers();
}

export function useSiteData() {
  const [contactInfo, setContactInfo] = useState<SiteContactInfo>(getSiteContactInfo);
  const [inquiries, setInquiries] = useState<InquiryItem[]>(getInquiries);
  const [practiceAreas, setPracticeAreas] = useState<PracticeAreaItem[]>(getPracticeAreas);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated);

  useEffect(() => {
    const handler = () => {
      setContactInfo(getSiteContactInfo());
      setInquiries(getInquiries());
      setPracticeAreas(getPracticeAreas());
      setIsAuthenticated(isAdminAuthenticated());
    };

    window.addEventListener("lawfirm_site_data_updated", handler);
    window.addEventListener("storage", handler);

    // Initial sync
    handler();

    return () => {
      window.removeEventListener("lawfirm_site_data_updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    contactInfo,
    inquiries,
    practiceAreas,
    isAuthenticated,
  };
}
