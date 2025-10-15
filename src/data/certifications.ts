export interface ICertification {
  id: number;
  title: string;
  code: string;
  badge: string;
  link: string;
}

export const certifications: ICertification[] = [
  {
    id: 1,
    title: "Azure Fundamentals",
    code: "AZ-900",
    badge: "/badges/az-900.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/ParagNaikade-8757/FC3E6C162E57EA25?sharingId=CA3DB2FE9F818DF1",
  },
  {
    id: 2,
    title: "Azure Developer Associate",
    code: "AZ-204",
    badge: "/badges/az-204.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/ParagNaikade-8757/72AA9BA7C12B346A?sharingId=CA3DB2FE9F818DF1",
  },
  {
    id: 3,
    title: "Azure AI Fundamentals",
    code: "AI-900",
    badge: "/badges/ai-900.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/ParagNaikade-8757/2F29D9525949A100?sharingId=CA3DB2FE9F818DF1",
  },
  {
    id: 4,
    title: "Azure AI Engineer Associate",
    code: "AI-102",
    badge: "/badges/ai-102.svg",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/ParagNaikade-8757/5DE0C0DD83DADA85?sharingId=CA3DB2FE9F818DF1",
  },
];
