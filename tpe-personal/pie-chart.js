$( document ).ready(function() {

  generatePieChart = function(dataset, container) {
    var chart = c3.generate({
      data: {
        // iris data from R
        columns: dataset,
        type : 'pie',
      },
      bindto: document.getElementById(container),
    });
    return chart;    
  }

});