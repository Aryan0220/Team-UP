import { v } from "convex/values";
import { mutation } from "./_generated/server";
const images = [
    "/next.svg",
    "/logo.svg",
    "/vercel.svg",
];
export const create = mutation({
    args:{
        ordId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.ordId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })
        return board;
    }
})
