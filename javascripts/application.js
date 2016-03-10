$( document ).ready(function() {

  var dataset = [
    { word: "hola",
      quantity: 50
    },
    { word: "chau",
      quantity: 25
    },
    { word: "gilada",
      quantity: 73
    },
    { word: "cabida",
      quantity: 28
    },
    { word: "antes",
      quantity: 9
    },
    { word: "kevin",
      quantity: 1
    },
    { word: "visualizacion",
      quantity: 19
    },
   ];

  var sizeScale = d3.scale.linear().domain([1,73]).range([8,40]);
  //var colorScale = d3.scale.linear().domain([1,73]).range(d3.scale.category10());
  var colorScale = d3.scale.category10();

  function mySort(dataset) {
    console.log("giladita");
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
    .style("font-size", function(d){ return sizeScale(d.quantity) + "px"; })
    .color(function(d){return colorScale(d.quantity);});


});
