export interface FeaturedWorkItem {
  title: string;
  href: string;
  bullets?: string[];
}

export const featuredWork: FeaturedWorkItem[] = [
  {
    title: "zachrobertson.tech",
    href: "https://github.com/zachrobertson/zachrobertson.tech",
    bullets: [
      "Personal blog and portfolio website built with Next.js and deployed on Vercel with automated deployments via GitHub Actions.",
      "Implemented custom LLM-powered search page with intelligent query routing and real-time response capabilities using the OpenAI API.",
    ],
  },
];
