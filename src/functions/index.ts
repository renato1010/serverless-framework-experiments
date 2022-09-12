import { hello } from "@functions/hello";
import { getCity } from "@functions/get-city-info";
import { generateUploadQr } from "@functions/create-and-upload-qrs";

const functionList = { hello, getCity, generateUploadQr };
export { functionList };
