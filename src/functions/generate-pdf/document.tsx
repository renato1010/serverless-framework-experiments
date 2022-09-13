import * as React from "react";
import { Page, View, Document, Text, renderToString, Image } from "@react-pdf/renderer";
import { monthlyPayment } from "@libs/installments";
import { styles } from "./styles";

const qrSrc = "https://qr-images-ptiontinetan.s3.us-east-2.amazonaws.com/qr-fakeId.png";
const applianceSrc = "https://m.media-amazon.com/images/I/51DnRqKbpHL._AC_SX679_.jpg";
// Create Document Component
const BaseDocument = () => {
  const product = {
    name: "PRODUCT_NAME",
    price: 9_000,
    rate: 6,
  };
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Text style={styles.titleTxt}>Product: {product.name}</Text>
        <View style={styles.row}>
          <View style={styles.section}>
            <Image src={applianceSrc} style={styles.appliancePic}></Image>
          </View>
          <View style={styles.section}>
            <Image src={qrSrc} style={styles.qrPic}></Image>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.installmentsTxt}>Installments:</Text>
          <Text>3 months: {`$${monthlyPayment(product.price, product.rate, 3)}`}</Text>
          <Text>6 months: {`$${monthlyPayment(product.price, product.rate, 6)}`}</Text>
          <Text>12 months: {`$${monthlyPayment(product.price, product.rate, 12)}`}</Text>
          <Text>24 months: {`$${monthlyPayment(product.price, product.rate, 24)}`} </Text>
        </View>
      </Page>
    </Document>
  );
};

async function getPdfDoc() {
  return await renderToString(<BaseDocument />);
}

export { getPdfDoc };
