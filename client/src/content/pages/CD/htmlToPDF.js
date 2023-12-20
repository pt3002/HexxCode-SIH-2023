import {
    PDFDownloadLink,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    pdf
  } from "@react-pdf/renderer";

  const styles = StyleSheet.create({
    body: {
      padding: 10,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "100%",
      borderStyle: "solid",
      backgroundColor: "#BEBEBE",
      borderColor: "#bfbfbf",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol1: {
      width: "25%",
      borderStyle: "solid",
      backgroundColor: "#E8E8E8",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol2: {
      width: "50%",
      borderStyle: "solid",
      backgroundColor: "#E8E8E8",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol3: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: 5,
      fontSize: 12,
      fontWeight: 500,
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    declareHead: {
      fontSize: 11,
      marginTop: 10,
    },
    declare: {
      fontSize: 11,
    },
    place: {
      fontSize: 11,
      marginTop: 25,
    },
    date: {
      fontSize: 11,
      textAlign: "left",
    },
    sign: {
      fontSize: 11,
      textAlign: "right",
    },
    view: {
      width: "60%",
      // height: "120",
      padding: 0,
      marginBottom: 5,
      backgroundColor: "white",
      alignSelf: "center",
    },
    image: {
      objectFit: "cover",
    },
  });

  const MyDoc = () => (
    <Document>
      <Page style={styles.body}>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={{ ...styles.tableCellHeader, fontWeight: "600" }}>
                COEP PG Diploma Admission REGISTRATION ID :{" "}
                {personalData.registrationID}
              </Text>
            </View>
          </View>
        </View>
        
      </Page>
    </Document>
  );

  const DownloadApplication = () => {
    <PDFDownloadLink document={<MyDoc />} fileName="LTPModel.pdf">
        <Button variant = "contained">
        Download Table
    </Button>
    </PDFDownloadLink>
    
  }

  export default DownloadApplication