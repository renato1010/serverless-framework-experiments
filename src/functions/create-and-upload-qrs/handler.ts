import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import middy from "@middy/core";
import middyValidator from "@middy/validator";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyHttpErrorHandler from "@middy/http-error-handler";
import middySsm from "@middy/ssm";
import * as QRCode from "qrcode";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { schema } from "./schema";

const s3Client = new S3Client({ region: "us-east-2" });

const lambdaHandler: APIGatewayProxyHandlerV2 = async (event, context) => {
  // @ts-ignore
  const { productId } = event.body;
  const bucketName = context?.["bucketName"] ?? undefined;
  if (!bucketName) {
    throw new Error("Couldn't get target folder for generated QR");
  }
  const qrMessage = `https://my-ecommerce-app/product/${productId}`;
  try {
    const base64 = await QRCode.toDataURL(qrMessage);
    const base64Data = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const type = base64.split(";")[0].split("/")[1];
    const imageName = `qr-${(productId as string).replace(" ", "-")}`;

    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: `${imageName}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    const uploadCmd = new PutObjectCommand(params);
    const uploadQrResponse = await s3Client.send(uploadCmd);
    const uploadOpStatusCode = uploadQrResponse.$metadata?.httpStatusCode;
    const qrUrl = `https://${bucketName}.s3.us-east-2.amazonaws.com/${imageName}.${type}`;
    return { statusCode: uploadOpStatusCode, body: JSON.stringify({ ok: true, url: qrUrl }) };
  } catch (error) {
    throw new Error("Error generating QR: ", error);
  }
};

export const generateUploadQr = middy(lambdaHandler)
  .use(middyJsonBodyParser())
  .use(middyValidator({ inputSchema: schema }))
  .use(
    middySsm({
      fetchData: {
        bucketName: "qr-bucket-name",
      },
      setToContext: true,
    })
  )
  .use(middyHttpErrorHandler());
