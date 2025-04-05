import { AppProps } from "next/app";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"]
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={firaCode.className}>
      <Component {...pageProps} />
    </main>
  );
};