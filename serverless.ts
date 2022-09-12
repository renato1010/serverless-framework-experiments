import type { AWS } from "@serverless/typescript";

import { custom } from "@config/custom";
import { resources } from "@config/resources";
import { provider } from "@config/provider";
import { hello } from "@functions/hello";
import { getCity } from "@functions/get-city-info";

const serverlessConfiguration: AWS = {
  service: "aws-typescript-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-s3-sync"],
  provider,
  // import the function via paths
  functions: { hello, getCity },
  package: { individually: true },
  custom,
  resources,
};

module.exports = serverlessConfiguration;
