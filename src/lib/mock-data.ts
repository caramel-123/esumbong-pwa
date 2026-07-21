export type ProjectStatus = "verified" | "pending" | "flagged";

export interface Project {
  id: string;
  name: string;
  contractId: string;
  agency: string;
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
    location: "Mandaluyong City",
    budget: "₱64M",
    claimedPct: 65,
    actualPct: 40,
    status: "flagged",
    description:
      "Structural rehabilitation of the Boni-Hulo bridge span, including reinforcement of support columns and resurfacing of the roadway deck.",
  },
];

export function getProject(id: string): Project {
  return projects.find((p) => p.id === id) ?? projects[0];
}
