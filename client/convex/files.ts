import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getUploadsByUserId = query({
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    if (!user) {
      return null;
    }

    const uploads = await ctx.db
      .query("conversions")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();

    return uploads;
  },
});

/**
 * This mutation generates a 1hr upload URL for a file in the storage bucket. The upload URL is used to upload a file directly to the storage bucketURL
 */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/**
 * This mutation is used to send an image to Convex storage.
 */
export const sendImage = mutation({
  args: {
    storageId: v.id("_storage"),
    documentSize: v.number(),
    documentName: v.string(),
    toolUsed: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    await ctx.db.insert("conversions", {
      userId: user._id,
      documentSize: args.documentSize,
      documentName: args.documentName,
      documentId: args.storageId,
      toolUsed: args.toolUsed,
    });
  },
});
