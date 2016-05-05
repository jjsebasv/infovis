$( document ).ready(function() {

  var dataset = {};
  var relevancy = [];
  var getJson = function(my_dataset) {
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(my_dataset));
    localStorage.setItem('shape', JSON.stringify(my_dataset))
    window.open(url, '_blank');
    window.focus();
  };

  authors = ['authors'];
  totalMessages = ['Total'];
  relevantMessages = [];
  irrelevantMessages = [];
  averageOfIrrelevancy = ['Average of Irrelevancy'];

  d3.json("https://raw.githubusercontent.com/jjsebasv/infovis/gh-pages/tpe-personal/data.json", function(json) {
    for (var data in json) {
      aux = {
        "Author": data,
        "relevant": 0,
        "irrelevant": 0,
        "total": 0,
        "averageOfIrrelevancy": 0
      };

      $.each(json[data].messages, function(){
        if ($(this)[0].relevant) {
          aux.relevant ++;
        } else {
          aux.irrelevant --;
        };
        aux.total ++;
      });
      aux.averageOfIrrelevancy = ((-aux.irrelevant/aux.total)*100);

      authors.push(data);
      totalMessages.push(aux.total);
      relevantMessages.push(aux.relevant);
      irrelevantMessages.push(-aux.irrelevant);
      averageOfIrrelevancy.push(aux.averageOfIrrelevancy );

      relevancy.push(aux);

    };

    gauge = generateGauge(['Average of Irrelevancy', 0], 'gauge');    

    chart = generateStackedBarFromJson(
      relevancy,
      'stacked-bar',
      'Author',
      ['relevant', 'irrelevant', 'total'],
      ['relevant', 'irrelevant'],
      averageOfIrrelevancy,
      gauge
    );

    pie = generatePieChart(
      [
        ["Relevants"].concat(relevantMessages.reduce(function(pv, cv) { return pv + cv; }, 0)), 
        ["Irrelevants"].concat(irrelevantMessages.reduce(function(pv, cv) { return pv + cv; }, 0))
      ],
      'piechart'
    );

    $('#average').click( function() {
      sorted = sortByAverage(relevancy);
      sortedAverage = ["Average of Irrelevancy"].concat(sorted.map(function(obj){return obj.averageOfIrrelevancy}));
      chart.load({
        json: sorted,
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
      chart.load({
        columns: [
          sortedAverage
        ],
        type: 'line'
      });
    });

    $('#total').click( function() {
      sorted = sortByTotal(relevancy);
      sortedAverage = ["Average of Irrelevancy"].concat(sorted.map(function(obj){return obj.averageOfIrrelevancy}));
      chart.load({
        json: sorted,
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
      chart.load({
        columns: [
          sortedAverage
        ],
        type: 'line'
      });
    });

    $('#relevant').click( function() {
      sorted = sortByRelevant(relevancy);
      sortedAverage = ["Average of Irrelevancy"].concat(sorted.map(function(obj){return obj.averageOfIrrelevancy}));
      chart.load({
        json: sorted,
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
      chart.load({
        columns: [
          sortedAverage
        ],
        type: 'line'
      });
    });

    $('#irrelevant').click( function() {
      sorted = sortByIrrelevant(relevancy);
      sortedAverage = ["Average of Irrelevancy"].concat(sorted.map(function(obj){return obj.averageOfIrrelevancy}));
      chart.load({
        json: sorted,
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
      chart.load({
        columns: [
          sortedAverage
        ],
        type: 'line'
      });
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
  };

  
  //generateStackedBar(['giladitas', 'aa', 'bb'], [['label',10,20], ['otroLabel',50,30]]  ,[], 'stacked-bar');

});
