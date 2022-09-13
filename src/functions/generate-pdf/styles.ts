import { StyleSheet } from '@react-pdf/renderer';

// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  titleTxt: {
    textAlign: 'center',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    height: '45%',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  qrPic: {
    width: 150,
    height: 150,
  },
  appliancePic: {
    width: 150,
    height: 240,
  },
  bottom: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  installmentsTxt: {
    marginBottom: 10,
    textAlign: 'center',
  },
  installmentRow: {
    width: '60%',
    textAlign: 'center',
    borderRadius: '1px',
  },
});
