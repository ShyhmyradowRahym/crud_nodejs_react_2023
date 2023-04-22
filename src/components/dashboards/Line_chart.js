
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = () => {
    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(59,130,246)",
                borderColor: "rgb(59,130,246)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };
    return (
        <Line data={data}/>
    );
};

export default LineChart;