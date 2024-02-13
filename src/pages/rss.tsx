import { getAllBlogs } from "@/lib/api";
import { GetServerSidePropsContext } from 'next';

type RssProps = {
    rss: string
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
    const posts = await getAllBlogs();

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
        <channel>
            <title>RSS</title>
            <link>https://zachrobertson.tech</link>
            <language>en</language>
            <br/>
    `;

    posts.forEach(post => {
        rss += `
            <item>
                <title>${post.title}</title>
                <link>https://zachrobertson.tech/blog/${post.id}</link>
                <description>${post.excerpt}</description>
                <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            </item>
        `;
    });

    rss += `</channel></rss>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(rss);
    res.end();
    return {
        props: {
            rss
        }
    };
}

const RssPage = (props: RssProps) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.rss }} />
    );
};

export default RssPage;
