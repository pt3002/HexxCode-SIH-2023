import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import PageHeader from "../../dashboards/Crypto/PageHeader";
import { Container } from "@mui/material";
import BooksTable from "../Components/Table/BooksTable";
import { subDays } from "date-fns";
import { Card } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { backendURL } from "../../../configKeys";
import { useLocation } from "react-router-dom";


function SubjectsForResources() {
  const[subject, setSubject] = useState("");
  const location = useLocation();

  // const temp_books = [
  //   {
  //     id: "1",
  //     orderDetails: "Fiat Deposit",
  //     orderDate: new Date().getTime(),
  //     status: "excellent",
  //     orderID: "VUVX709ET7BY",
  //     sourceName: "Bank Account",
  //     sourceDesc: "*** 1111",
  //     amountCrypto: 34.4565,
  //     amount: 56787,
  //     cryptoCurrency: "ETH",
  //     currency: "$",
  //   },
  //   {
  //     id: "2",
  //     orderDetails: "Fiat Deposit",
  //     orderDate: subDays(new Date(), 1).getTime(),
  //     status: "excellent",
  //     orderID: "23M3UOG65G8K",
  //     sourceName: "Bank Account",
  //     sourceDesc: "*** 1111",
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: "BTC",
  //     currency: "$",
  //   },
  //   {
  //     id: "3",
  //     orderDetails: "Fiat Deposit",
  //     orderDate: subDays(new Date(), 5).getTime(),
  //     status: "good",
  //     orderID: "F6JHK65MS818",
  //     sourceName: "Bank Account",
  //     sourceDesc: "*** 1111",
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: "BTC",
  //     currency: "$",
  //   },
  //   {
  //     id: "4",
  //     orderDetails: "Fiat Deposit",
  //     orderDate: subDays(new Date(), 55).getTime(),
  //     status: "excellent",
  //     orderID: "QJFAI7N84LGM",
  //     sourceName: "Bank Account",
  //     sourceDesc: "*** 1111",
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: "BTC",
  //     currency: "$",
  //   },
  //   {
  //     id: "5",
  //     orderDetails: "Fiat Deposit",
  //     orderDate: subDays(new Date(), 56).getTime(),
  //     status: "good",
  //     orderID: "BO5KFSYGC0YW",
  //     sourceName: "Bank Account",
  //     sourceDesc: "*** 1111",
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: "BTC",
  //     currency: "$",
  //   },
  //   {
  //     id: "6",
  //     orderDetails: "Fiat Deposit",
  //     orderDate: subDays(new Date(), 33).getTime(),
  //     status: "excellent",
  //     orderID: "6RS606CBMKVQ",
  //     sourceName: "Bank Account",
  //     sourceDesc: "*** 1111",
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: "BTC",
  //     currency: "$",
  //   },
  //   {
  //     id: "7",
  //     orderDetails: "Wallet Transfer",
  //     orderDate: subDays(new Date(), 123).getTime(),
  //     status: "great",
  //     orderID: "17KRZHY8T05M",
  //     sourceName: "Wallet Transfer",
  //     sourceDesc: "John's Cardano Wallet",
  //     amountCrypto: 765.5695,
  //     amount: 7567,
  //     cryptoCurrency: "ADA",
  //     currency: "$",
  //   },
  // ];

  const [books, setBooks] = useState([]);

  React.useEffect(() => {
    let body = 
    {
      subject_id: location.state.subject_id,
    };
    axios
      .post(backendURL + "/CurriculumDeveloper/getBooksBySubjects",
        body,
      {
        headers: {
          "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
        },
      })
      .then((res) => {
        // console.log("BOOKS==============================>",res.data);
        let array = res.data.books;
        // console.log("array===",array.length);
        let temp_resources = [];
        for (let i = 0; i < array.length; i++) {
          let n = {
            id: array[i].id,
            // subject_id: array[i].subject_id,
            code: array[i].code,
            name: array[i].name,
            author: array[i].author,
            rating: array[i].rating,
            creation_time: array[i].creation_time,
          };
          temp_resources.push(n);
        }
        setBooks(temp_resources);
        // console.log("setted books========>", books);
      })
      .catch((error) => {
        // console.log("Error Code: ", error);
      });
  });

  return (
    <>
      <Helmet>
        <title>Subjects</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <h1>Resources Page</h1>
        <Card>
          <BooksTable books={books} />
        </Card>
      </Container>
    </>
  );
}

export default SubjectsForResources;
