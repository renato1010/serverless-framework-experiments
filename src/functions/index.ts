import { hello } from "@functions/hello";
import { getCity } from "@functions/get-city-info";
import { generateUploadQr } from "@functions/create-and-upload-qrs";
import { generatePDF } from "@functions/generate-pdf";
import { publicMediaUpload } from "@functions/upload-media";

const functionList = { hello, getCity, generateUploadQr, generatePDF, publicMediaUpload };
export { functionList };
