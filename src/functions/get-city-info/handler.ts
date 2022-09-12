import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cityData, type CityData } from "./city-data";

const apiResponses: {
  [key: string]: (
    body: Record<string, string> | CityData
  ) => APIGatewayProxyResult;
} = {
  _200: (body) => ({ statusCode: 200, body: JSON.stringify(body, null, 2) }),
  _400: (body) => ({ statusCode: 400, body: JSON.stringify(body, null, 2) }),
};
async function lambdaHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const city = event.queryStringParameters?.city;
  if (city == null || !cityData[city]) {
    return apiResponses._400({
      message: `Missing city or no data for that city}`,
    });
  }
  return apiResponses._200(cityData[city]);
}

const getCity = middy(lambdaHandler);

export { getCity };
