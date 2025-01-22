import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ width, height ,color,size}) => {
  // Sample data
  const data = [
    { name: 'C1', y: 33 },
    { name: 'C2 ', y: 33 },
    { name: 'C3 ', y: 33 },
  
  ];

  useEffect(() => {
    const options = {
      chart: {
        type: 'pie',
        backgroundColor:color , // Set background color to transparent
      },
      title: {
        text: "Token Sales Volume",
        style: {
          color: "white", // Set title color
          fontSize:"12px", // Set title font size
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: "white", 
              fontFamily: "Poppins"
            },
            connectorWidth: 1, 
            connectorPadding: 0, 
          },
          size: size,
        },
      },
      series: [
        {
          name: 'Data',
          colorByPoint: true,
          data: data,
        },
      ],
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -50,
        y: 80,
        floating: false,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true,
        itemStyle: {
          color: color, // Set legend item color to white
        },
      },
      credits: {
        enabled: false,
      },
    };

    Highcharts.chart('pieContainer', options);
  }, []); // No dependency needed as data is defined within the component

  return <div id="pieContainer" style={{  width, height  }}></div>;
};

export default PieChart;
