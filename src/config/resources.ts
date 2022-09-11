import type { AWS } from "@serverless/typescript";

const resources: AWS["resources"] = {
  Resources: {
    QRBucketUpload: {
      Type: "AWS::S3::Bucket",
      Properties: {
        BucketName: "${self:custom.bucketName}",
      },
    },
  },
};

export { resources };
