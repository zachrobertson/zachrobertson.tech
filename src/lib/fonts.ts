import { Roboto } from "next/font/google";

/** Swap the import and config here to change the site font family. Use from `_app.tsx` only — not `_document`. */
export const siteFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
