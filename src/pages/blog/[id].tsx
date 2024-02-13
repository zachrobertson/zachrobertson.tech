import { BlogData } from '@/interfaces/blog';
import markdownToHtml from "@/lib/markdownToHtml";
import BlogTemplate from "@/components/blogTemplate";
import { getBlogById, getBlogIds } from "@/lib/api";

type Params = {
    params: {
        id: string;
    };
};

export async function getStaticProps({ params }: Params) {
    const blog = await getBlogById(params.id);
    const content = await markdownToHtml(blog.content || "");
    return {
        props: {
            ...blog,
            content,
        },
    };
};

export async function getStaticPaths() {
    const blogIds = getBlogIds();

    return {
        paths: blogIds.map(id => {
            return {
                params: {
                    id,
                },
            };
        }),
        fallback: false,
    };
};

export default function BlogPost(postData: BlogData) {
    return <BlogTemplate {...postData} />;
};