import { AWS } from "@serverless/typescript";
import { schema } from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export const generatePDF: AWS["functions"]["generatePDF"] = {
  handler: `${handlerPath(__dirname)}/handler.generatePDF`,
  events: [
    {
      http: {
        method: "post",
        path: "pdf/create",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
