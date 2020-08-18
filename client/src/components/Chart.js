import React from "react";
import { Bar } from "react-chartjs-2";
export default (props) => {
  return (
    <div>
      {props.chartType === "Bar" && (
        <Bar
          data={props.chartData}
          options={{
            title: {
              display: true,
              text: props.title,
              fontSize: 25,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    // max: 100,
                  },
                },
              ],
            },
            // responsive: false,
            maintainAspectRatio: false,
            legend: {
              position: "right",
              labels: {
                boxWidth: 50,
                fontSize: 20,
              },
            },
          }}
          width={500}
          height={500}
        />
      )}
    </div>
  );
};
