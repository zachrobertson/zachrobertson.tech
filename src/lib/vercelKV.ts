import { createClient } from "@vercel/kv";

const kv = createClient({
    url: process.env.VERCEL_KV_REST_API_URL,
    token: process.env.VERCEL_KV_REST_API_TOKEN
});

export default kv;