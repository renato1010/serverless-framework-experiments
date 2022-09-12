import { AWS } from "@serverless/typescript";
import { schema } from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export const generateUploadQr: AWS["functions"]["generateUploadQr"] = {
  handler: `${handlerPath(__dirname)}/handler.generateUploadQr`,
  role: "arn:aws:iam::${aws:accountId}:role/QRBucketGetAdd",
  events: [
    {
      http: {
        method: "post",
        path: "qr/create",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
