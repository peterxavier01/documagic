import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, MutationCtx, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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
 * Retrieve recent uploads
 */
export const getRecentUploads = query({
  args: { toolUsed: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    if (!user) {
      return null;
    }

    const uploads = await ctx.db
      .query("conversions")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .filter((q) => q.eq(q.field("toolUsed"), args.toolUsed))
      .order("desc")
      .take(5);

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
 * This mutation is used to save an image to Convex storage.
 */
export const sendImage = mutation({
  args: {
    storageId: v.id("_storage"),
    documentSize: v.number(),
    documentName: v.string(),
    toolUsed: v.string(),
    extractedText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    await ctx.db.insert("conversions", {
      userId: user._id,
      documentSize: args.documentSize,
      documentName: args.documentName,
      documentId: args.storageId,
      toolUsed: args.toolUsed,
      extractedText: args.extractedText,
    });
  },
});

/**
 * Returns a list of all conversions with pagination
 */
export const getConversions = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.id("users"),
    toolUsed: v.string(),
  },
  handler: async (ctx, args) => {
    const conversions = await ctx.db
      .query("conversions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("toolUsed"), args.toolUsed))
      .order("desc")
      .paginate(args.paginationOpts);

    return conversions;
  },
});

/**
 * Return a single conversion document
 */
export const getConversion = query({
  args: { conversionId: v.id("conversions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.conversionId);
  },
});

/**
 * Update an existing conversion document
 */
export const updateConversion = mutation({
  args: {
    conversionId: v.id("conversions"),
    documentName: v.string(),
    extractedText: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversionId, {
      documentName: args.documentName,
      extractedText: args.extractedText,
    });
  },
});

/**
 * Delete image from storage by its ID
 */
async function deleteImageById(ctx: MutationCtx, storageId: Id<"_storage">) {
  await ctx.storage.delete(storageId);
}

/**
 * Delete a single conversion document
 */
export const deleteConversion = mutation({
  args: { conversionId: v.id("conversions"), storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.conversionId);
    await deleteImageById(ctx, args.storageId);
  },
});
