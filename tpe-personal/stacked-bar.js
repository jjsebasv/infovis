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

  generateStackedBarFromJson = function(dataset, container, x_axis, displayed_values, grouped, extraLine, gauge) {
    var chart = c3.generate({
      data: {
        json: dataset,
        type: 'bar',
        keys: {
          x: x_axis, // it's possible to specify 'x' when category axis
          value: displayed_values
        },
        groups: [grouped],
        selection: {
          grouped: true
        },
        onclick: function (d, i) { fillGauge(getAverage(dataset,this.internal.config.axis_x_categories[d.x]), gauge); }
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
    chart.load({
      columns: [
        extraLine
      ],
      type: 'line'
    });
    return chart;
  };

  getAverage = function(array, x) {
    var result = $.grep(array, function(e){ return e.Author == x; });
    return result[0].averageOfIrrelevancy;
  };


});