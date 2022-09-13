import { hello } from "@functions/hello";
import { getCity } from "@functions/get-city-info";
import { generateUploadQr } from "@functions/create-and-upload-qrs";
import { generatePDF } from "@functions/generate-pdf";

const functionList = { hello, getCity, generateUploadQr, generatePDF };
export { functionList };
