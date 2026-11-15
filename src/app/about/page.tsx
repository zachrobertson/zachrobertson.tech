import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Zach Robertson is an aerospace software engineer with a physics degree.",
};

export default function AboutPage() {
    return (
        <>
            <p className="eyebrow">about</p>
            <h1 style={{ margin: "0.5rem 0 2rem", fontSize: "2.25rem", letterSpacing: "-0.02em" }}>About me</h1>
            <div className="prose">
                <p>
                    I&apos;m Zach Robertson, a software developer with a physics degree. Day to day I work as an aerospace software engineer, which
                    means flight software, simulation, and the tooling that keeps both honest.
                </p>
                <p>
                    I&apos;m also curious about what AI can do for engineering work. I&apos;ve spent time on an open-source agent framework and on
                    training pipelines for transformer models in PyTorch and TensorFlow (and a bit of Tinygrad, if you know you know). Lately I&apos;ve
                    been building small systems where a model makes a judgment and ordinary code stays in charge of everything else.
                </p>
                <p>
                    Away from the keyboard I race bikes, mostly gravel and crits, because I like going fast. If you&apos;re in the St. Louis area,
                    come by Carondelet Park on Tuesday nights for the local crit series. Everyone is welcome.
                </p>
            </div>
        </>
    );
}
