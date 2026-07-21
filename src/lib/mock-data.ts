export type ProjectStatus = "verified" | "pending" | "flagged";

export interface Project {
  id: string;
  name: string;
  contractId: string;
  agency: string;
  contractor: string;
  location: string;
  budget: string;
  claimedPct: number;
  actualPct: number;
  status: ProjectStatus;
  description: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Quezon City Flood Control Phase 2",
    contractId: "DPWH-NCR-2024-Q2",
    agency: "DPWH",
    contractor: "Bantay Ilog Construction Corp.",
    location: "Barangay Talayan, District 1",
    budget: "₱120M",
    claimedPct: 85,
    actualPct: 40,
    status: "flagged",
    description:
      "This infrastructure initiative involves the expansion of existing box culverts and the installation of a high-capacity pumping station to alleviate seasonal flooding in the Talayan catchment area. Construction began in Q3 2023.",
  },
  {
    id: "2",
    name: "Pasig River Esplanade Phase 4",
    contractId: "DOTR-2023-B102",
    agency: "DOTr",
    contractor: "Ilaw at Tubig Builders Inc.",
    location: "Pasig City",
    budget: "₱85M",
    claimedPct: 92,
    actualPct: 90,
    status: "verified",
    description:
      "Continuation of the riverside esplanade and pedestrian corridor, connecting existing completed segments with new lighting and flood-resilient paving.",
  },
  {
    id: "3",
    name: "Mandaluyong Bridge Rehabilitation",
    contractId: "DPWH-NCR-2024-001",
    agency: "DPWH",
    contractor: "Tulay Bakal Engineering Corp.",
    location: "Mandaluyong City",
    budget: "₱64M",
    claimedPct: 65,
    actualPct: 40,
    status: "flagged",
    description:
      "Structural rehabilitation of the Boni-Hulo bridge span, including reinforcement of support columns and resurfacing of the roadway deck.",
  },
  {
    id: "4",
    name: "Caloocan Elementary School Building Expansion",
    contractId: "DEPED-NCR-2024-014",
    agency: "DepEd",
    contractor: "Haligi Construction Corporation",
    location: "Caloocan City",
    budget: "₱32M",
    claimedPct: 55,
    actualPct: 50,
    status: "pending",
    description:
      "Construction of a new three-storey, six-classroom building to ease overcrowding at an existing public elementary school, including accessibility ramps and a covered walkway.",
  },
  {
    id: "5",
    name: "Marikina Riverside Pumping Station Upgrade",
    contractId: "MWSS-2023-P088",
    agency: "MWSS",
    contractor: "Tatag Infra Builders Inc.",
    location: "Marikina City",
    budget: "₱48M",
    claimedPct: 100,
    actualPct: 98,
    status: "verified",
    description:
      "Capacity upgrade of an existing flood-control pumping station along the Marikina River, including new pump units and an automated water-level monitoring system.",
  },
];

export function getProject(id: string): Project {
  return projects.find((p) => p.id === id) ?? projects[0];
}
