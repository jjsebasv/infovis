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
  relevantMessages = ['Relevants'];
  irrelevantMessages = ['Irrelevants'];

  d3.json("https://raw.githubusercontent.com/jjsebasv/infovis/gh-pages/tpe-personal/data.json", function(json) {
    for (var data in json) {
      aux = {
        "Author": data,
        "relevant": 0,
        "irrelevant": 0,
        "total": 0
      };

      $.each(json[data].messages, function(){
        if ($(this)[0].relevant) {
          aux.relevant ++;
        } else {
          aux.irrelevant --;
        };
        aux.total ++;
      });

      authors.push(data);
      totalMessages.push(aux.total);
      relevantMessages.push(aux.relevant);
      irrelevantMessages.push(-aux.irrelevant);

      relevancy.push(aux);

    };

    chart = generateStackedBarFromJson(
      relevancy,
      'stacked-bar',
      'Author',
      ['total', 'relevant', 'irrelevant'],
      ['relevant', 'irrelevant']
    );
    
    console.log(relevancy);

    $('#name').click( function() {
      chart.load({
        json: sortByName(relevancy),
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
    });

    $('#total').click( function() {
      chart.load({
        json: sortByTotal(relevancy),
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
    });

    $('#relevant').click( function() {
      chart.load({
        json: sortByRelevant(relevancy),
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
      });
    });

    $('#irrelevant').click( function() {
      chart.load({
        json: sortByIrrelevant(relevancy),
        keys: {
          x: 'Author', // it's possible to specify 'x' when category axis
          value: ['total', 'relevant', 'irrelevant']
        },
        groups: ['relevant', 'irrelevant'],  
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

  generateGauge(['data', 55.8], 'gauge');
  //generateStackedBar(['giladitas', 'aa', 'bb'], [['label',10,20], ['otroLabel',50,30]]  ,[], 'stacked-bar');

});
