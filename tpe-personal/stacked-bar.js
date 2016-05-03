/* Dataset Example
    ['data1', -30, 200, 200, 400, -150, 250],
    ['data2', 130, 100, -100, 200, -150, 50],
    ['data3', -230, 200, 200, -300, 250, 250]
   ------------------------------------------
   Labels Example
    ['label', 'label1', 'label2'...]
   ------------------------------------------
   Grouped Example
    ['data1', 'data2']
*/

$( document ).ready(function() {
  generateStackedBar = function(labels, dataset, grouped, container){
    var chart = c3.generate({
      data: {
        x : labels[0],
        columns: [
          labels,
          dataset[0]
        ],
        type: 'bar',
        groups: [
          grouped   
        ]
      },
      axis: {
        x: {
          type: 'category',
          height: 80
        }
      },
      bindto: document.getElementById(container),
    });
    chart.load({
      columns: dataset
    });
    chart.zoom.enable(true);
    return chart
  };

  printGilada = function(chart) {
    console.log(chart.data.axes());
  };

  generateStackedBarFromJson = function(dataset, container, x_axis, displayed_values, grouped) {
    var chart = c3.generate({
      data: {
        json: dataset,
        type: 'bar',
        keys: {
          x: x_axis, // it's possible to specify 'x' when category axis
          value: displayed_values
        },
        groups: [grouped],
      },
      size: {
        height: 600
      },
      bar: {
        width: {
          ratio: .6
        } 
      },
      axis: {
        x: {
          type: 'category',
          height: 80
        }
      },
      bindto: document.getElementById(container),
      zoom: {
        enabled: true
      }
    });
    return chart;
  };


});