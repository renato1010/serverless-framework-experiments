import { AWS } from "@serverless/typescript";
import { handlerPath } from "@libs/handler-resolver";


export const getCity:AWS["functions"]["getCity"] = {
  handler: `${handlerPath(__dirname)}/handler.getCity`,
  events: [
    {
      http: {
        method: "get",
        path: "get-city-info",
        cors: true,
      },
    },
  ],
};
