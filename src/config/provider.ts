import type { AWS } from "@serverless/typescript";

const provider: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs16.x",
  region: "us-east-2",
  apiGateway: {
    minimumCompressionSize: 1024,
    shouldStartNameWithService: true,
    binaryMediaTypes: ["*/*"],
  },
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
  },
};

export { provider };
