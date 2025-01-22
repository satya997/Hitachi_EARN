import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const LineChart = ({ height, width, color,small }) => {
  
  useEffect(() => {
    const options = {
      chart: {
        type: 'area',
        backgroundColor: color
      },
   
      title: {
        text: 'Total Projects Trends',
        style: {
          color: 'white',
          fontSize: '12px',
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        gridLineWidth: 0,
        min: 0,
        max: 80000000,
        tickPositions:small? [0, 20000000,  40000000, 60000000,  80000000]
        : [0, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000],
        title: {
          text: null,
        },
        labels: {
          style: {
            color: 'white',
          },
        },
        plotBands: [
          {
            from: 0,
            to: 20000000,
            color: color,
          },
          {
            from: 20000000,
            to: 40000000,
            color: color,
          },
          {
            from: 40000000,
            to: 60000000,
            color: color,
          },
          {
            from: 60000000,
            to: 80000000,
            color: color,
          },
        ],
      },
      xAxis: {
        gridLineColor: 'transparent',
        gridLineWidth: 0,
        accessibility: {
          rangeDescription: 'Range: 0 to 9',
        },
        labels: {
          style: {
            color: 'white',
          },
        },
        categories: [
          "PRJ-123", "PRJ-124", "PRJ-125", "PRJ-126", "PRJ-127", "PRJ-128", "PRJ-129", "PRJ-130", "PRJ-131", "PRJ-132",
          "PRJ-133", "PRJ-134", "PRJ-135", "PRJ-136", "PRJ-137", "PRJ-138", "PRJ-139", "PRJ-140", "PRJ-141", "PRJ-142",
          "PRJ-143", "PRJ-144", "PRJ-145", "PRJ-146", "PRJ-147", "PRJ-148", "PRJ-149", "PRJ-150", "PRJ-151", "PRJ-152",
          "PRJ-153", "PRJ-154", "PRJ-155", "PRJ-156", "PRJ-157", "PRJ-158", "PRJ-159", "PRJ-160", "PRJ-161", "PRJ-162",
          "PRJ-163", "PRJ-164",
        ],
      },

      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666',
          },
          fillColor: {
            color: 'red', 
          },
        },
      },
      series: [
        {
          name: 'Net Value',
          data: [
            20250720, 29377648.65, 26819257.98, 25460693.28, 19865948.16, 19753675.48,
            21217815.19, 17152785.72, 25745048.51, 21979672.40, 21161158.40, 18748984.39,
            20987232.04, 27738644.80, 20930650.70, 26901714.84, 19331936.00, 19774042.50,
            23412473.72, 20030747.88, 19743283.56, 24996699.84, 25647270.58, 20489481.26,
            19450417.57, 28854482.07, 19785547.60, 27744777.72, 22490086.59, 17811702.85,
            21680126.42, 33116904.81, 33377861.66, 19223303.40, 20331984.10, 26525017.60,
            31591023.75, 18746910.80, 21060170.57, 18435187.40, 32379741.90, 21659738.88,
          ],
          zones: [
            {
              value: 0,
              color: 'gray',
            },
            {
              value: 80000000,
              color: 'gray',
            },
            
          ],
          marker: {
            enabled: false,
          },
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, 'gray'],
              [1, 'rgba(128, 128, 128, 0)'],
            ],
          },
          tooltip: {
            pointFormatter: function() {
              return '<span style="color:' + this.color + '">●</span> ' + this.series.name + ': <b>$' + Highcharts.numberFormat(this.y, 2) + '</b><br/>';
            }
          }
        },
        
        {
          name: 'Revenue',
          data: [
            8196720, 9392853.65, 8819755.98, 7779656.28, 4345676.16, 6926613.48, 6380182.19, 3539463.72,
            8695347.51, 6279906.4, 6863078.4, 6165773.39, 8855884.04, 10401991.8, 8089760.7, 8089326.84,
            7249476, 3954808.5, 7593234.72, 6023231.88, 6922969.56, 10117711.84, 10197107.58, 8146420.26,
            7061616.57, 10707009.07, 5653013.6, 10618371.72, 7790683.59, 5527769.85, 7958527.42, 13750293.81,
            13627647.66, 3966713.4, 6309926.1, 9946881.6, 12444948.75, 5818006.8, 8886661.57, 5267196.4,
            13332834.9, 4738067.88,
          ],
          zones: [
            {
              value: 0,
              color: 'orange',
            },
            {
              value: 80000000,
              color: 'orange',
            },
          ],
          marker: {
            enabled: false,
          },
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, 'orange'], 
              [1, 'rgba(255, 0, 0, 0)'],
            ],
          },
          tooltip: {
            pointFormatter: function() {
              return '<span style="color:' + this.color + '">●</span> ' + this.series.name + ': <b>$' + Highcharts.numberFormat(this.y, 2) + '</b><br/>';
            }
          }
        },
        {
          name: 'Cost',
          data: [
            12054000, 19984795, 17999502, 17681037, 15520272, 12827062, 14837633, 13613322, 17049701,
            15699766, 14298080, 12583211, 12131348, 17336653, 12840890, 18812388, 12082460, 15819234,
            15819239, 14007516, 12820314, 14878988, 15450163, 12343061, 12388801, 18147473, 14132534,
            17126406, 14699403, 12283933, 13721599, 19366611, 19750214, 15256590, 14022058, 16578136,
            19146075, 12928904, 12173509, 13167991, 19046907, 16921671,
          ],
          zones: [
            {
              value: 0,
              color: '#00ffff', 
            },
            {
              value: 80000000,
              color: '#00ffff', 
            },
          ],
          marker: {
            enabled: false, 
          },
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, '#00ffff'], 
              [1, 'rgba(0, 255, 255, 0)'], 
            ],
          },
          tooltip: {
            pointFormatter: function() {
              return '<span style="color:' + this.color + '">●</span> ' + this.series.name + ': <b>$' + Highcharts.numberFormat(this.y, 2) + '</b><br/>';
            }
          }
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 600,
            },
            chartOptions: {
              xAxis: {
                gridLineColor: 'transparent',
                gridLineWidth: 0,
                accessibility: {
                  rangeDescription: 'Range: 0 to 9',
                },
                labels: {
                  style: {
                    color: 'white',
                  },
                },
                
              },
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };

    Highcharts.chart('lineChartContainer', options);
  }, []);

  return <div id="lineChartContainer" style={{ width, height }}></div>;
};

export default LineChart;