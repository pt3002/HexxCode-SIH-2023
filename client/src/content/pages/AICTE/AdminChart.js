import React, { useState } from "react";
import Chart from 'chart.js/auto';
import { Bar, Pie } from "react-chartjs-2";
import { backendURL } from "../../../configKeys";
import axios from "axios";

function AdminChart() {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const barData = {
    labels: barChartData.map((data) => data.university),
    datasets: [
      {
        label: "University Wise Representation",
        data: barChartData.map((data) => data.no_of_applications)
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(255, 159, 64, 0.2)",
        //   "rgba(255, 205, 86, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(153, 102, 255, 0.2)",
        //   "rgba(201, 203, 207, 0.2)",
        // ],
        // borderColor: [
        //   "rgb(255, 99, 132)",
        //   "rgb(255, 159, 64)",
        //   "rgb(255, 205, 86)",
        //   "rgb(75, 192, 192)",
        //   "rgb(54, 162, 235)",
        //   "rgb(153, 102, 255)",
        //   "rgb(201, 203, 207)",
        // ],
        // borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: pieChartData.map((data) => data.gender),
    datasets: [
      {
        label: "Gender Ratio",
        data: pieChartData.map((data) => data.no_of_applications),
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
      },
    ],
  };
  React.useEffect(() => {
    axios.get(backendURL + "/AICTEAdmin/getCDApplicationCountUniversityWise").then((res) => {
      setBarChartData(res.data.applications);
    });

    axios.get(backendURL + "/AICTEAdmin/getCDApplicationCountGenderWise").then((res) => {
      setPieChartData(res.data.applications);
    });
  }, []);
  return (
    <div>
      AdminChart
      <div>
        <Bar data={barData} />
      </div>
      <div style={{width: "500px"}}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default AdminChart;
