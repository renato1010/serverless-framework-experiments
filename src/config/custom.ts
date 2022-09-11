import type { AWS } from "@serverless/typescript";

const custom: AWS["custom"] = {
  esbuild: {
    bundle: true,
    minify: false,
    sourcemap: true,
    exclude: ["aws-sdk"],
    target: "node14",
    define: { "require.resolve": undefined },
    platform: "node",
    concurrency: 10,
  },
  bucketName: "${ssm:qr-bucket-name}",
  s3Sync: [
    {
      bucketName: "${ssm:qr-bucket-name}",
      localDir: "qr-sync",
      deleteRemoved: true,
      acl: "public-read",
    },
  ],
};

export { custom };
