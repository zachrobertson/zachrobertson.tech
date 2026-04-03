import { AppProps } from "next/app";
import { siteFont } from "@/lib/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `html, body { font-family: ${siteFont.style.fontFamily}; }`,
        }}
      />
      <div
        className={siteFont.className}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}