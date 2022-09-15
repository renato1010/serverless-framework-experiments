import { AWS } from "@serverless/typescript";
import { handlerPath } from "@libs/handler-resolver";

export const publicMediaUpload: AWS["functions"]["publicMediaUpload"] = {
  handler: `${handlerPath(__dirname)}/handler.publicMediaUpload`,
  role: "arn:aws:iam::${aws:accountId}:role/DefaultPublicMediaUploader",
  events: [
    {
      http: {
        method: "post",
        path: "media/upload",
      },
    },
  ],
};
