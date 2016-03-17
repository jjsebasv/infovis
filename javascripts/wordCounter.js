// Adapted from http://aaizemberg.github.io/infovis-itba/aaizemberg/definitions/index.html

$( document ).ready(function() {

  var url = "https://github.com/jjsebasv/infovis/blob/gh-pages/definitions.txt";

  var dataset;

  d3.text(url, function(error, text) {
    if (error) throw error;
    // source: https://gist.github.com/bradoyler/5610057 https://github.com/bradoyler

    var wordcnt = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word) {
      map[word] = (map[word]||0)+1;
      return map;
    }, Object.create(null) );

    var tabu_words = ["of", "the", "to", "and", "in", "a", "is", "are", "for", "it", "or", "this", "an", "as", "with", "that", "not", "has", "be", "can", "on", "kind", "such", "do", "more", "sometimes", "which", "makes", "examples","eg","et", "al"];

    var tmp = [];
    for (var key in wordcnt) {
      if ( tabu_words.indexOf(key) == -1 ) {
        tmp.push( { "word" : key, "quantity" : wordcnt[key] } );
      }
    }

    dataset = tmp.sort( function compare(a, b) {  return b.quantity - a.quantity; } );
  });

  word_cloud();
  function word_cloud() {
    console.log("something");
    var escala = d3.scale.log().domain([dataset[0].quantity,dataset[dataset.length-1].quantity]).range([40,15]);
    var c10 = d3.scale.category10();
    d3.select(".my-cloud").selectAll("span").dataset(dataset).enter().append("span")
      .text( function(d,i) { return d.word + " "; } )
      .style("font-size", function(d,i) { return escala(d.quantity) + "px";} )
      .style("color", function(d,i) {return c10(i);} );
  }
});
