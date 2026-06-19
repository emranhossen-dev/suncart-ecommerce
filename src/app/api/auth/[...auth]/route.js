import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const GET = async (req) => {
    const res = await toNextJsHandler(auth).GET(req);
    return res;
};

export const POST = async (req) => {
    const res = await toNextJsHandler(auth).POST(req);
    return res;
};