import type { APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { getPdfDoc } from "./document";
import { BaseProduct } from "./types";

const qrSrc = "https://qr-images-ptiontinetan.s3.us-east-2.amazonaws.com/qr-fakeId.png";
const applianceSrc = "https://m.media-amazon.com/images/I/51DnRqKbpHL._AC_SX679_.jpg";

const basicHandler: APIGatewayProxyHandlerV2 = async () => {
  const product: BaseProduct = { name: "Gas Range", price: 1_800, rate: 4 };
  try {
    const pdfDocAsString = await getPdfDoc({ product, qrSrc, applianceSrc });
    const pdfOut = Buffer.from(pdfDocAsString).toString("base64");
    const headers: APIGatewayProxyStructuredResultV2["headers"] = {
      "Content-Type": "application/pdf",
      "Access-Control-Allow-Origin": "*",
    };

    return { statusCode: 200, body: pdfOut, isBase64Encoded: true, headers };
  } catch (error) {
    console.log({ pdfGenerationError: error });
    return { statusCode: 500, body: JSON.stringify({ message: error?.message ?? "error generating pdf" }) };
  }
};

export const generatePDF = middy(basicHandler).use(middyJsonBodyParser());
