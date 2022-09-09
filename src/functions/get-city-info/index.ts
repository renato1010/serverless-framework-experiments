import { handlerPath } from "@libs/handler-resolver";

export default {
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
