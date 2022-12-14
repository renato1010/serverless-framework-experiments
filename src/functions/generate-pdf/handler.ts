import type { APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { getPdfDoc } from "./document";
import { BaseProduct } from "./types";


const basicHandler: APIGatewayProxyHandlerV2 = async () => {
  const product: BaseProduct = { name: "Gas Range", price: 1_800, rate: 4 };
  try {
    const pdfDocAsString = await getPdfDoc({ product });
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
