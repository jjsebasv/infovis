$(document).ready(function(){

  var wordle_feeling = [
    {
      title: "I felt creative",
      agree: 88,
      neutral: 8,
      disagree: 4
    },
    {
      title: "I felt an emotional reaction",
      agree: 66,
      neutral: 22,
      disagree: 12
    },
    {
      title: "I learned something new about the text",
      agree: 63,
      neutral: 24,
      disagree: 13
    },
    {
      title: "It confirmed my understanding of the text",
      agree: 57,
      neutral: 33,
      disagree: 10
    },
    {
      title: "It jogged my memory",
      agree: 50,
      neutral: 35,
      disagree: 15
    },
    {
      title: "The Wordle confused me",
      agree: 5,
      neutral: 9,
      disagree: 86
    },
  ];

  var svgTitles = d3.select(".svg-container").append("svg").classed("opinion-titles", true).attr("width", 300).attr("height", 300).attr("text-anchor", "end");
  var svgBars = d3.select(".svg-container").append("svg").classed("opinion-bars", true).attr("width", 200).attr("height", 300);

  wordle_feeling.forEach(function(element, index, array) {
    // Adding tooltips from http://plnkr.co/edit/JpVkqaZ1AmFdBbOMwMup?p=preview
    /*
      ** Call this select
      var tooltip = d3.select("body")
  	                  .append("div")
                    	.style({
                          "position": "absolute",
                          "z-index": "10",
                          "visibility": "hidden",
                          "background-color": "white",
                          "border": "1px solid #000",
                          "border-radius": "5px",
                          "padding": "5px"
                      });
      ** Add this to the svg
      .on("mouseover", function(){return tooltip.style("visibility", "visible").text("Disagree");})
  	  .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
  	  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    */

    svgTitles.selectAll('text')
    .data(wordle_feeling)
    .enter()
    .append('text')
    .text(function(d) { return d.title; })
    .style("text-align", "right")
    .attr("x", 300)
    .attr("y", function(d,i) { return 10+i*30});

    svgBars.selectAll("bar1")
    .data(wordle_feeling)
    .enter()
    .append("rect")
    .attr("x", 10)
    .attr("y", function(d,i) { return i*30})
    .attr("fill", "#1a9641")
    .attr("width", function(d){return d.agree})
    .attr("height", 10)
    .append("title").text("Agree")

    svgBars.selectAll("bar2")
    .data(wordle_feeling)
    .enter()
    .append("rect")
    .attr("x", function(d){return 10 + d.agree})
    .attr("y", function(d,i) { return i*30})
    .attr("fill", "#ffffbf")
    .attr("width", function(d){return d.neutral})
    .attr("height", 10)
    .append("title").text("Neutral")

    svgBars.selectAll("bar3")
    .data(wordle_feeling)
    .enter()
    .append("rect")
    .attr("x", function(d){return 10 + d.agree + d.neutral})
    .attr("y", function(d,i) { return i*30})
    .attr("fill", "#d7191c")
    .attr("width", function(d){return d.disagree})
    .attr("height", 10)
    .append("title").text("Disagree")
  });


});
