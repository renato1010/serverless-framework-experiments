import * as React from "react";
import { Page, View, Document, Text, renderToString, Image } from "@react-pdf/renderer";
import { monthlyPayment } from "@libs/installments";
import { styles } from "./styles";
import type { BaseProduct } from "./types";

type BaseDocumentProps = {
  product: BaseProduct;
  qrSrc: string;
  applianceSrc: string;
};

// Create Document Component
const BaseDocument = ({ product, qrSrc, applianceSrc }: BaseDocumentProps) => {
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
          {[3, 6, 12, 24].map((val, i) => (
            <Text style={{ ...styles.installmentRow, backgroundColor: i % 2 === 0 ? "#34d399" : "#a7f3d0" }}>
              {val} months: {`${monthlyPayment(product.price, product.rate, val)}`}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

async function getPdfDoc(data: BaseDocumentProps) {
  return await renderToString(<BaseDocument {...data} />);
}

export { getPdfDoc };
