import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = ({ width, height, color,small }) => {
  // Sample data
  const data = [
    { name: 'data', y: 273 },
    { name: 'data', y: 211},
    { name: 'data', y: 327},
    { name: 'data', y: 358 },
    { name: 'data', y: 415},
    { name: 'data', y: 296},
    { name: 'data', y: 375},
    { name: 'data', y: 237 },
    { name: 'data', y: 280 },
    { name: 'data', y: 445},
    { name: 'data', y: 326},
    { name: 'data', y: 212},
    { name: 'data', y: 337},
    { name: 'data', y: 439},
    { name: 'data', y: 331},
    { name: 'data', y: 449},
    { name: 'data', y: 275},
    { name: 'data', y: 335},
  ];

  useEffect(() => {
    const options = {
      chart: {
        type: 'line', 
        backgroundColor: color,
      },
      title: {
        text: "Green Electricity Produced ",
        style: {
          color: "white",
          fontSize: "12px",
        },
      },
      xAxis: {
        categories: ["26-Dec", "27-Dec", "28-Dec", "29-Dec", "30-Dec", "31-Dec", "1-Jan", "2-Jan", "3-Jan", "4-Jan", "5-Jan", "6-Jan", "7-Jan", "8-Jan", "9-Jan", "10-Jan", "11-Jan", "12-Jan"],
        title: {
          text: '',
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            color: 'white',
          },
        },
      },
      yAxis: {
        title: {
          text: '',
          style: {
            color: 'white',
          },
        },
        gridLineColor: 'rgba(255, 255, 255, 0.3)',
        labels: {
          style: {
            color: 'white',
          },
        },
        tickPositions: small?[0,100,300,500]:
        [0, 100, 200, 300, 400, 500],
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            color: 'white',
          },
          marker: {
            enabled: true,
            fillColor: 'white',
            lineColor: 'white',
          },
         
        },
      },
      series: [
        {
          name: 'Data',
          data: data.map((item) => item.y),
          color: '#21FC0D',
        },
      ],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
    };

    Highcharts.chart('lineContainer', options);
  }, []);

  return <div id="lineContainer" style={{ width, height }}></div>;
};

export default BarChart;
