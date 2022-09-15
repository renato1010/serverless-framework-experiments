import * as fileType from "file-type";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { slug } from "cuid";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyHttpErrorHandler from "@middy/http-error-handler";
import middySsm from "@middy/ssm";
import type { APIGatewayProxyHandler } from "aws-lambda";

const s3Client = new S3Client({ region: "us-east-2" });

const lambdaHandler: APIGatewayProxyHandler = async (event, context) => {
  const { body, isBase64Encoded } = event;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, message: "No request body" }),
    };
  }
  const bucketName = context?.["bucketName"] ?? undefined;
  if (!bucketName) {
    throw new Error("Couldn't get s3 bucket for generated QR");
  }
  try {
    if (typeof body === "string" && isBase64Encoded) {
      const buffer = Buffer.from(body, "base64");
      const fileInfo = await fileType.fromBuffer(buffer);
      const detectedExt = fileInfo.ext;
      const detectedMime = fileInfo.mime;
      console.log({ detectedExt, detectedMime });
      if (!detectedExt || !detectedMime) {
        return {
          statusCode: 400,
          body: JSON.stringify({ ok: false, message: "Couldn't get info about file" }),
        };
      }
      const fileName = slug();
      const key = `${fileName}.${detectedExt}`;
      console.log(`Writting image to bucket called ${key}`);
      const params: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: detectedMime,
      };
      const uploadCmd = new PutObjectCommand(params);
      const uploadResponse = await s3Client.send(uploadCmd);
      const uploadOpStatusCode = uploadResponse.$metadata?.httpStatusCode;
      const url = `https://${bucketName}.s3.us-east-2.amazonaws.com/${key}`;
      return { statusCode: uploadOpStatusCode, body: JSON.stringify({ ok: true, body: { url } }) };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, message: "Bad Request" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: error?.message ?? "Error processing request" }),
    };
  }
};

export const publicMediaUpload = middy(lambdaHandler)
  .use(middyJsonBodyParser())
  .use(
    middySsm({
      fetchData: {
        bucketName: "default-public-media-bucket",
      },
      setToContext: true,
    })
  )
  .use(middyHttpErrorHandler());
