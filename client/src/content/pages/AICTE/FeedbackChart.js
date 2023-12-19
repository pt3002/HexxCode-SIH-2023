import React, { useState, useRef } from "react";
import Chart from "chart.js/auto";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { backendURL } from "../../../configKeys";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function FeedbackChart() {
  //   const [barChartData, setBarChartData] = useState([]);
  //   const [pieChartData, setPieChartData] = useState([]);
  const chartRef = useRef();
  const [feedbackData, setfeedbackData] = useState([]);
  const [avgFeedbackData, setAvgFeedbackData] = useState([]);
  const [drillDown, setdrillDown] = useState(false);
  const [ind, setInd] = useState(0);

  const feedbackMainParameters = {
    0: "quality_content",
    1: "utility_content",
    2: "affectiveness",
    3: "goals",
    4: "evaluation",
  };
  const feedbackSubParameters = [
    //0: Quality Content
    [
      "Accessibility",
      "Accuracy and timeliness",
      "Objectivity",
      "Scope and Sequence of topics covered",
      "Comprehensive",
    ],
    //1: Utility
    [
      "Support Cognitive Development",
      "Problem-Solving",
      "Promotes development of executive functioning",
      "Differentiated instruction for diverse populations",
      "Clearly specifies learning goals",
    ],
    //2: Affectiveness
    [
      "Instructional supports",
      "Self Efficacy",
      "Engagement",
      "Encourages Innovation and Research",
      "Flexibilty",
    ],
    //3: Goals and outcomes
    [
      "Meet requirements",
      "Ease of monitoring student progress",
      "Syntactic correctness",
      "Relevance",
      "Progressive and Balanced",
    ],
    //4: Evaluation
    [
      "Credit distribution",
      "Marking Scheme",
      "Pratical Knowledge",
      "Assessment Methods",
      "Time Distribution for each topic",
    ],
  ];

  const DrillAvgRatingCalculator = () => {
    let data = [];
    let total_feedbacks = feedbackData.length;
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;
    let p5 = 0;
    for (let index = 0; index < feedbackData.length; index++) {
      let temp = feedbackData[index][feedbackMainParameters[ind]];
      temp = temp.split("#");
      temp = temp.slice(0, -1);

      p1 = p1 + parseFloat(temp[0]);
      p2 = p2 + parseFloat(temp[1]);
      p3 = p3 + parseFloat(temp[2]);
      p4 = p4 + parseFloat(temp[3]);
      p5 = p5 + parseFloat(temp[4]);
    }

    data.push(p1 / total_feedbacks);
    data.push(p2 / total_feedbacks);
    data.push(p3 / total_feedbacks);
    data.push(p4 / total_feedbacks);
    data.push(p5 / total_feedbacks);
    return data;
  };

  const AvgRatingCalculator = () => {
    let data = [];
    let total_feedbacks = feedbackData.length;
    let quality_content_sum = 0;
    let utility_content_sum = 0;
    let affectiveness_sum = 0;
    let goals_sum = 0;
    let evaluation_sum = 0;
    for (let index = 0; index < feedbackData.length; index++) {
      //0: Quality Content
      let quality_content = feedbackData[index].quality_content;
      quality_content = quality_content.split("#");
      quality_content = quality_content.slice(0, -1);
      quality_content = quality_content.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      quality_content = quality_content / 5;
      quality_content_sum = quality_content_sum + quality_content;

      //1: Utility Content
      let utility_content = feedbackData[index].utility_content;
      utility_content = utility_content.split("#");
      utility_content = utility_content.slice(0, -1);
      utility_content = utility_content.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      utility_content = utility_content / 5;
      utility_content_sum = utility_content_sum + utility_content;

      //2: Affectiveness
      let affectiveness = feedbackData[index].affectiveness;
      affectiveness = affectiveness.split("#");
      affectiveness = affectiveness.slice(0, -1);
      affectiveness = affectiveness.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      affectiveness = affectiveness / 5;
      affectiveness_sum = affectiveness_sum + affectiveness;

      //3: Goals
      let goals = feedbackData[index].goals;
      goals = goals.split("#");
      goals = goals.slice(0, -1);
      goals = goals.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      goals = goals / 5;
      goals_sum = goals_sum + goals;

      //4: Evaluation
      let evaluation = feedbackData[index].evaluation;
      evaluation = evaluation.split("#");
      evaluation = evaluation.slice(0, -1);
      evaluation = evaluation.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
      }, 0);
      evaluation = evaluation / 5;
      evaluation_sum = evaluation_sum + evaluation;
    }

    data.push(quality_content_sum / total_feedbacks);
    data.push(utility_content_sum / total_feedbacks);
    data.push(affectiveness_sum / total_feedbacks);
    data.push(goals_sum / total_feedbacks);
    data.push(evaluation_sum / total_feedbacks);
    return data;
  };

  const ColorCoder = () => {
    let colorArray = [];

    for (let index = 0; index < avgFeedbackData.length; index++) {
      if (avgFeedbackData[index] < 2) {
        colorArray.push("red");
      } else if (avgFeedbackData[index] >= 4) {
        colorArray.push("green");
      } else {
        colorArray.push("orange");
      }
    }

    return colorArray;
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 60,
          minRotation: 30,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Feedback Analysis",
      },
    },
  };

  const barData = {
    labels: [
      "Quality Content",
      "Utility Content",
      "Affectiveness",
      "Goals",
      "Evaluation",
    ],
    datasets: [
      {
        label: "Avg. Feedback Rating",
        data: AvgRatingCalculator(),
        backgroundColor: ColorCoder(),
        barThickness: 50,
        hoverBackgroundColor: "red",
      },
    ],
  };

  const drillBarData = {
    labels: feedbackSubParameters[ind],
    datasets: [
      {
        label: "Avg. Feedback Rating",
        data: DrillAvgRatingCalculator(),
        backgroundColor: ColorCoder(),
        hoverBackgroundColor: "red",
        barThickness: 50,
      },
    ],
  };

  //   const pieData = {
  //     labels: pieChartData.map((data) => data.gender),
  //     datasets: [
  //       {
  //         label: "Gender Ratio",
  //         data: pieChartData.map((data) => data.no_of_applications),
  //         backgroundColor: [
  //             'rgb(255, 99, 132)',
  //             'rgb(54, 162, 235)',
  //             'rgb(255, 205, 86)'
  //           ],
  //           hoverOffset: 4
  //       },
  //     ],
  //   };

  React.useEffect(() => {
    let body = {
      department: "Computer Engineering",
    };
    axios
      .post(backendURL + "/AICTEAdmin/getFeedbackDataDepartmentWise", body)
      .then((res) => {
        setfeedbackData(res.data.feedbacks);
        setAvgFeedbackData(AvgRatingCalculator());
      });
  }, []);
  return (
      <div>
        {
          drillDown ? (<IconButton
            onClick={() => {
              setdrillDown(false);
            }}
          >
            <ExitToAppIcon />
          </IconButton>):(<></>)
        }
        
        {drillDown ? (
          <Bar options={options} data={drillBarData} />
        ) : (
          <Bar
            ref={chartRef}
            data={barData}
            onClick={(e) => {
              let reference = getElementAtEvent(chartRef.current, e);
              console.log(reference[0].index);
              setdrillDown(true);
              setInd(reference[0].index);
            }}
          />
        )}
      </div>

  );
}
export default FeedbackChart;
