export const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        productId: { type: "string" },
      },
      required: ["productId"],
    },
  },
} as const;
