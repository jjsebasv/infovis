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

  var svgContainer = d3.select(".svg-container").append("svg").attr("width", 500).attr("height", 1400);

  d3.select(".svg-container svg").selectAll("text").data(wordle_feeling).enter().append("text").text(function(d){d.title});


});
