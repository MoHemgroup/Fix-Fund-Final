export type CampaignStatus =
  | "draft"
  | "pending_verification"
  | "quote_needed"
  | "live"
  | "funded"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "dispute";

export type IssueType =
  | "plumbing"
  | "mold"
  | "heating"
  | "electrical"
  | "roofing"
  | "structural"
  | "pest"
  | "appliance";

export interface Campaign {
  id: string;
  title: string;
  story: string;
  issueType: IssueType;
  city: string;
  neighborhood: string;
  goal: number;
  funded: number;
  status: CampaignStatus;
  verified: boolean;
  urgent: boolean;
  createdAt: string;
  tenantName: string;
  tenantAvatar: string;
  images: string[];
  donorCount: number;
  daysLeft: number;
  scopeSummary: string;
  contractorName: string;
  updates: CampaignUpdate[];
}

export interface CampaignUpdate {
  id: string;
  date: string;
  text: string;
  type: "status" | "photo" | "milestone";
}

export interface Donor {
  id: string;
  name: string;
  totalDonated: number;
  campaignsSupported: number;
  anonymous: boolean;
}

export interface Contractor {
  id: string;
  name: string;
  company: string;
  specialty: IssueType[];
  rating: number;
  jobsCompleted: number;
  licensed: boolean;
  insured: boolean;
}

export const STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Draft",
  pending_verification: "Pending Verification",
  quote_needed: "Quote Needed",
  live: "Live Fundraising",
  funded: "Fully Funded",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  dispute: "Under Review",
};

export const ISSUE_LABELS: Record<IssueType, string> = {
  plumbing: "Plumbing",
  mold: "Mold Remediation",
  heating: "Heating / HVAC",
  electrical: "Electrical",
  roofing: "Roofing",
  structural: "Structural",
  pest: "Pest Control",
  appliance: "Appliance",
};

export const ISSUE_ICONS: Record<IssueType, string> = {
  plumbing: "🔧",
  mold: "🦠",
  heating: "🔥",
  electrical: "⚡",
  roofing: "🏠",
  structural: "🧱",
  pest: "🐛",
  appliance: "🔌",
};

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Broken Heating System for Family of 4",
    story: "Our furnace stopped working in mid-January. We have two young children, ages 3 and 6, and the temperature inside has dropped to the 40s at night. We've been using space heaters but our electric bill has tripled. Our landlord says they can't afford the repair and told us to 'wear more layers.' We just need a working furnace so our kids can sleep safely.",
    issueType: "heating",
    city: "Chicago",
    neighborhood: "South Shore",
    goal: 4400,
    funded: 3520,
    status: "live",
    verified: true,
    urgent: true,
    createdAt: "2026-02-10",
    tenantName: "Maria G.",
    tenantAvatar: "",
    images: [],
    donorCount: 47,
    daysLeft: 8,
    scopeSummary: "Replace gas furnace unit, inspect ductwork, test carbon monoxide levels.",
    contractorName: "Reliable HVAC Pros",
    updates: [
      { id: "u1", date: "2026-02-15", text: "Contractor confirmed quote and availability. Campaign is live!", type: "status" },
      { id: "u2", date: "2026-02-20", text: "80% funded! Thank you to all donors so far.", type: "milestone" },
    ],
  },
  {
    id: "camp-2",
    title: "Black Mold in Bathroom Affecting Child's Asthma",
    story: "There's been black mold growing in our bathroom for months. My 8-year-old daughter has asthma and her attacks have gotten worse. The landlord sent someone to paint over it twice, but it keeps coming back. We need proper mold remediation — removal, sealing, and ventilation fix.",
    issueType: "mold",
    city: "Detroit",
    neighborhood: "Brightmoor",
    goal: 3300,
    funded: 1650,
    status: "live",
    verified: true,
    urgent: true,
    createdAt: "2026-02-05",
    tenantName: "Tanya W.",
    tenantAvatar: "",
    images: [],
    donorCount: 23,
    daysLeft: 14,
    scopeSummary: "Full mold remediation of bathroom, install exhaust fan, seal walls and ceiling.",
    contractorName: "CleanAir Restoration",
    updates: [
      { id: "u3", date: "2026-02-08", text: "Identity verified, contractor matched.", type: "status" },
    ],
  },
  {
    id: "camp-3",
    title: "Leaking Roof Causing Ceiling Collapse",
    story: "Our roof has been leaking for over a year. Last week, part of the ceiling in the living room caved in. There's exposed wiring and waterlogged insulation hanging down. We've been living in one room of the apartment. The landlord is unreachable.",
    issueType: "roofing",
    city: "Memphis",
    neighborhood: "Frayser",
    goal: 5500,
    funded: 5500,
    status: "completed",
    verified: true,
    urgent: false,
    createdAt: "2025-12-01",
    tenantName: "James R.",
    tenantAvatar: "",
    images: [],
    donorCount: 72,
    daysLeft: 0,
    scopeSummary: "Patch roof section, replace water-damaged ceiling, re-insulate, inspect electrical.",
    contractorName: "TopLine Roofing & Repair",
    updates: [
      { id: "u4", date: "2026-01-10", text: "Fully funded! Scheduling contractor.", type: "milestone" },
      { id: "u5", date: "2026-01-25", text: "Repair completed! James and his family are safe.", type: "status" },
    ],
  },
  {
    id: "camp-4",
    title: "No Hot Water for 3 Weeks",
    story: "Our water heater broke three weeks ago. We've been boiling water on the stove to bathe our two toddlers. The landlord said they'd fix it 'when they get around to it.' We just want hot water again.",
    issueType: "plumbing",
    city: "Cleveland",
    neighborhood: "Hough",
    goal: 2200,
    funded: 880,
    status: "live",
    verified: true,
    urgent: false,
    createdAt: "2026-02-18",
    tenantName: "DeShawn P.",
    tenantAvatar: "",
    images: [],
    donorCount: 12,
    daysLeft: 21,
    scopeSummary: "Replace 40-gallon electric water heater, inspect plumbing connections.",
    contractorName: "City Plumbing Co.",
    updates: [],
  },
  {
    id: "camp-5",
    title: "Exposed Wiring in Children's Bedroom",
    story: "There are exposed electrical wires in the wall of my children's bedroom where the outlet broke. I've taped it over with electrical tape but I'm terrified every day. An electrician said the whole room needs to be rewired. Our landlord won't return calls.",
    issueType: "electrical",
    city: "Baltimore",
    neighborhood: "Sandtown-Winchester",
    goal: 3850,
    funded: 3850,
    status: "scheduled",
    verified: true,
    urgent: true,
    createdAt: "2026-01-20",
    tenantName: "Keisha M.",
    tenantAvatar: "",
    images: [],
    donorCount: 54,
    daysLeft: 0,
    scopeSummary: "Rewire bedroom, replace outlets and switch, update to code, install GFCI.",
    contractorName: "SafeWire Electrical",
    updates: [
      { id: "u6", date: "2026-02-10", text: "Campaign fully funded!", type: "milestone" },
      { id: "u7", date: "2026-02-20", text: "Contractor scheduled for March 5th.", type: "status" },
    ],
  },
  {
    id: "camp-6",
    title: "Severe Pest Infestation — Roaches & Mice",
    story: "We've had roaches and mice for months. They're in the kitchen, the kids' toys, everywhere. I've tried traps and sprays but it's building-wide. We need professional extermination and entry point sealing. The landlord says 'every building has bugs.'",
    issueType: "pest",
    city: "Philadelphia",
    neighborhood: "Kensington",
    goal: 1650,
    funded: 330,
    status: "live",
    verified: true,
    urgent: false,
    createdAt: "2026-02-22",
    tenantName: "Rosa L.",
    tenantAvatar: "",
    images: [],
    donorCount: 8,
    daysLeft: 28,
    scopeSummary: "Full apartment extermination (2 treatments), seal entry points, install door sweeps.",
    contractorName: "Guardian Pest Solutions",
    updates: [],
  },
];

export const donors: Donor[] = [
  { id: "d1", name: "Sarah K.", totalDonated: 250, campaignsSupported: 3, anonymous: false },
  { id: "d2", name: "Anonymous", totalDonated: 500, campaignsSupported: 5, anonymous: true },
  { id: "d3", name: "Michael T.", totalDonated: 100, campaignsSupported: 1, anonymous: false },
  { id: "d4", name: "The Johnson Family", totalDonated: 1000, campaignsSupported: 4, anonymous: false },
  { id: "d5", name: "Anonymous", totalDonated: 75, campaignsSupported: 2, anonymous: true },
  { id: "d6", name: "Community First Fund", totalDonated: 2500, campaignsSupported: 6, anonymous: false },
  { id: "d7", name: "Elena R.", totalDonated: 150, campaignsSupported: 2, anonymous: false },
  { id: "d8", name: "David W.", totalDonated: 300, campaignsSupported: 3, anonymous: false },
  { id: "d9", name: "Anonymous", totalDonated: 50, campaignsSupported: 1, anonymous: true },
  { id: "d10", name: "Grace H.", totalDonated: 200, campaignsSupported: 2, anonymous: false },
];

export const contractors: Contractor[] = [
  { id: "c1", name: "Mike Johnson", company: "Reliable HVAC Pros", specialty: ["heating"], rating: 4.8, jobsCompleted: 12, licensed: true, insured: true },
  { id: "c2", name: "Sandra Lee", company: "CleanAir Restoration", specialty: ["mold"], rating: 4.9, jobsCompleted: 8, licensed: true, insured: true },
  { id: "c3", name: "Robert Davis", company: "TopLine Roofing & Repair", specialty: ["roofing", "structural"], rating: 4.7, jobsCompleted: 15, licensed: true, insured: true },
  { id: "c4", name: "Carlos Mendez", company: "City Plumbing Co.", specialty: ["plumbing"], rating: 4.6, jobsCompleted: 20, licensed: true, insured: true },
  { id: "c5", name: "Angela Brown", company: "SafeWire Electrical", specialty: ["electrical"], rating: 4.9, jobsCompleted: 10, licensed: true, insured: true },
];
