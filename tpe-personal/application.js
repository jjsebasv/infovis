$( document ).ready(function() {

  var dataset = {};
  var relevancy = [];
  var getJson = function(my_dataset) {
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(my_dataset));
    localStorage.setItem('shape', JSON.stringify(my_dataset))
    window.open(url, '_blank');
    window.focus();
  };
  relevants = {
    "key": "Relevants",
    "color": "#d67777",
    "values": []
  };
  irrelevants = {
    "key": "Irrelevants",
    "color": "#4f99b4",
    "values": []
  };

  d3.json("https://raw.githubusercontent.com/jjsebasv/infovis/gh-pages/tpe-personal/data.json", function(json) {
    for (var data in json) {
      aux = {
        "author": data,
        "relevant": 0,
        "irrelevant": 0,
        "total": 0
      };

      $.each(json[data].messages, function(){
        if ($(this)[0].relevant) {
          aux.relevant ++;
        } else {
          aux.irrelevant ++;
        };
        aux.total ++;
      });
      relevancy.push(aux);
      relevants.values.push({
        "label": data,
        "value": aux.relevant
      });
      irrelevants.values.push({
        "label": data,
        "value": aux.irrelevant
      });
    };
    console.log(relevancy);
    doubleBar = [relevants, irrelevants];
    svgFunction(relevancy);
    getJson(doubleBar);
  });

  d3.json('https://raw.githubusercontent.com/jjsebasv/infovis/gh-pages/tpe-personal/relevancy.json', function(data) {
    nv.addGraph(function() {
      var chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .margin({top: 30, right: 20, bottom: 50, left: 175})
          .showValues(true)           //Show bar value next to each bar.
          .tooltips(true)             //Show tooltips on hover.
          .transitionDuration(350)
          .showControls(true);        //Allow user to switch between "Grouped" and "Stacked" mode.

      chart.yAxis
          .tickFormat(d3.format(',.2f'));

      d3.select('#chart1 svg')
          .datum(data)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  });

  var svgFunction = function(my_dataset){
    var svgTitles = d3.select(".svg-container").append("svg").classed("opinion-titles", true).attr("width", 300).attr("height", 800).attr("text-anchor", "end");
    var svgBars = d3.select(".svg-container").append("svg").classed("opinion-bars", true).attr("width", 150).attr("height", 800);
    var svgReferences = d3.select(".svg-container").append("svg").classed("opinion-references", true).attr("width", 300).attr("height", 800).attr("text-anchor", "end");

    my_dataset.forEach(function(element, index, array) {
      svgTitles.selectAll('text')
      .data(my_dataset)
      .enter()
      .append('text')
      .text(function(d) { return d.author; })
      .style("text-align", "right")
      .attr("x", 300)
      .attr("y", function(d,i) { return 10+i*30});

      svgBars.selectAll("bar1")
      .data(my_dataset)
      .enter()
      .append("rect")
      .attr("x", 10)
      .attr("y", function(d,i) { return i*30})
      .attr("fill", "#1a9641")
      .attr("width", function(d){return (d.relevant/d.total)*100})
      .attr("height", 10)
      .append("title").text("Relevant")

      svgBars.selectAll("bar2")
      .data(my_dataset)
      .enter()
      .append("rect")
      .attr("x", function(d){return 10 + (d.relevant/d.total)*100})
      .attr("y", function(d,i) { return i*30})
      .attr("fill", "#d7191c")
      .attr("width", function(d){return (d.irrelevant/d.total)*100})
      .attr("height", 10)
      .append("title").text("Irrelevant")

      svgReferences.selectAll('text')
      .data(my_dataset)
      .enter()
      .append('text')
      .text(function(d) { return ((d.relevant/d.total)*100).toFixed(2) + "% relevant, out of " + d.total; })
      .style("text-align", "left")
      .attr("x", 200)
      .attr("y", function(d,i) { return 10+i*30});

    });


  }


});
