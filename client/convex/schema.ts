import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),

  users: defineTable({
    name: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    uploaded_documents: v.optional(v.array(v.string())),
  }).index("byExternalId", ["externalId"]),
});
