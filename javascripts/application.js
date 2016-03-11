$( document ).ready(function() {

  var dataset = [{"word":"graphical","quantity":6},{"word":"user","quantity":3},{"word":"large","quantity":3},{"word":"items","quantity":3},{"word":"interactive","quantity":4},{"word":"visual","quantity":9},{"word":"representations","quantity":6},{"word":"abstract","quantity":11},{"word":"data","quantity":34},{"word":"amplify","quantity":4},{"word":"cognition","quantity":5},{"word":"card","quantity":7},{"word":"information","quantity":29},{"word":"visualization","quantity":28},{"word":"computer","quantity":7},{"word":"graphics","quantity":4},{"word":"interaction","quantity":4},{"word":"2008","quantity":4},{"word":"that","quantity":6},{"word":"human","quantity":3},{"word":"with","quantity":6},{"word":"visualizations","quantity":3},{"word":"2005","quantity":3},{"word":"important","quantity":4},{"word":"charts","quantity":3},{"word":"such","quantity":3},{"word":"techniques","quantity":4},{"word":"scientific","quantity":3},{"word":"typically","quantity":3},{"word":"1998","quantity":4},{"word":"science","quantity":3},{"word":"this","quantity":8},{"word":"space","quantity":8},{"word":"more","quantity":3},{"word":"sometimes","quantity":3},{"word":"called","quantity":4},{"word":"kind","quantity":3},{"word":"which","quantity":3},{"word":"image","quantity":3},{"word":"screen","quantity":3},{"word":"makes","quantity":3},{"word":"examples","quantity":3},{"word":"attributes","quantity":3},{"word":"coordinates","quantity":3},{"word":"unstructured","quantity":3},{"word":"records","quantity":5},{"word":"different","quantity":3},{"word":"criteria","quantity":4},{"word":"each","quantity":3}];

  var sizeScale = d3.scale.linear().domain([3,34]).range([12,60]);
  var colorScale = d3.scale.linear().domain([3,34]).range(["royalBlue", "tomato"]);
  //var colorScale = d3.scale.category10();

  function mySort(dataset) {
    dataset.sort(
      function compare(a,b) {
        if (a.quantity > b.quantity)
          return -1;
        else if (a.quantity < b.quantity)
          return 1;
        else
          return 0;
    });
    return dataset;
  };

  mySort(dataset);

  d3.select(".my-chart").selectAll("span").data(dataset).enter().append("span")
    .text(function(d) { return d.word + " "; })
    .style({
      "font-size": function(d){ return sizeScale(d.quantity) + "px"; },
      "color": function(d){ return colorScale(d.quantity); }
    });




});
