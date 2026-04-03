export interface ExperienceEntry {
  company: string;
  title: string;
  location: string;
  dateRange: string;
  bullets: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  details: string[];
  dateRange: string;
  location: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const summaryParagraphs: string[] = [
  "Software engineer with 5+ years of experience developing mission-critical software for space flight applications. Proven expertise in building scalable telemetry systems, REST APIs, CI/CD pipelines, and customizing Linux-based operating systems.",
  "Strong background in modern web technologies (React, Next.js, TypeScript), cloud infrastructure (AWS, GCP, Vercel), and advanced ML engineering including training custom models, creating data ingestion and training pipelines, and embedding-based search and retrieval systems.",
];

export const experience: ExperienceEntry[] = [
  {
    company: "Odyssey Space Research LLC",
    title: "Aerospace Software Engineer",
    location: "Remote",
    dateRange: "March 2021 – Present",
    bullets: [
      "Developed full-stack telemetry exchange application using modern web technologies for the Gateway mission, enabling real-time insight and control of the Gateway station and visiting spacecraft from a web-based interface.",
      "Designed, architected, and implemented a tool for generating custom Linux-based ISO images or virtual machine filesystems for the human display computer, reducing time to deployment for new hardware by more than 50%.",
      "Created multiple prototype software projects to serve as proof of concept for functionality requested by stakeholders on the Gateway team, reducing contracting costs for NASA by providing groundwork for future development.",
      "Architected and implemented comprehensive CI/CD pipelines in GitLab, establishing automated testing, static analysis, and code quality checks to ensure compliance with NASA's coding standards.",
      "Architected LLM chat application with the functionality to answer questions about user-provided documents with a focus on local document storage and model hosting for offline use.",
    ],
  },
  {
    company: "Dispersol Technologies LLC",
    title: "Software Developer",
    location: "Georgetown, Texas",
    dateRange: "August 2020 – November 2020",
    bullets: [
      "Implemented SQL-based analysis tools for manufacturing equipment health monitoring and reliability analysis, decreasing downtime on manufacturing equipment and time to deployment for new equipment.",
      "Created custom software for automated database management and data migration from legacy systems using OCR to input data from physical records into an electronic database.",
    ],
  },
  {
    company: "Dispersol Technologies LLC",
    title: "Software Developer / Lab Technician",
    location: "Georgetown, Texas",
    dateRange: "July 2019 – August 2020",
    bullets: [
      "Created real-time web-based monitoring dashboards of manufacturing equipment status, reducing the time to identify and fix equipment issues.",
      "Performed lab technician duties such as equipment maintenance, calibration, and cleaning.",
    ],
  },
];

export const education: EducationEntry = {
  school: "Texas A&M University",
  degree: "Bachelor of Science, Physics",
  details: ["Minor in Mathematics"],
  dateRange: "Graduated 2019",
  location: "College Station, Texas",
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming languages",
    items: ["JavaScript / TypeScript", "Python", "Bash", "C / C++", "LaTeX"],
  },
  {
    label: "Web development",
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "HTTP",
      "HTML / CSS",
      "SQL",
    ],
  },
  {
    label: "Development & DevOps",
    items: ["Git", "GitLab CI/CD", "GitHub Actions", "Docker", "Linux administration"],
  },
  {
    label: "Cloud platforms",
    items: ["AWS", "Google Cloud Platform (GCP)", "Vercel"],
  },
];
