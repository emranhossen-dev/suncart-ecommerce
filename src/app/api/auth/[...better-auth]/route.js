import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

const handler = toNextJsHandler(auth)

export const GET = async (req) => {
    console.log(`[AUTH GET] ${req.url}`)
    try {
        const res = await handler.GET(req)
        console.log(`[AUTH GET STATUS] ${res.status}`)
        return res
    } catch (err) {
        console.error(`[AUTH GET ERROR]`, err)
        throw err
    }
}

export const POST = async (req) => {
    console.log(`[AUTH POST] ${req.url}`)
    try {
        const res = await handler.POST(req)
        console.log(`[AUTH POST STATUS] ${res.status}`)
        return res
    } catch (err) {
        console.error(`[AUTH POST ERROR]`, err)
        throw err
    }
}