$( document ).ready(function() {

  var dataset = {};

  var messages = $(".whatsapp-wrapper .message.message-chat .message-text");
  messages.each(function() {
    var information = $(this).find('.message-pre-text > span');
    var date = $(information[1]).text();
    var author = $(information[3]).text();
    var text = $(this).find('.selectable-text').text();
    if (dataset[author] === undefined) {
      dataset[author] = {
        'amount': 1,
        'messages': [{
          'date': date,
          'text': text
        }]
      };
    } else {
      var aux_msg = {
        'date': date,
        'text': text
      };
      dataset[author].amount ++;
      dataset[author].messages.push(aux_msg);
    }
  });
  var sortable = [];
  for (var data in dataset)
    sortable.push([data, dataset[data]])
  sortable.sort(function(a, b) {return b[1].amount - a[1].amount})

  var getJson = function(my_dataset) {
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(my_dataset));
    localStorage.setItem('shape', JSON.stringify(my_dataset))
    window.open(url, '_blank');
    window.focus();
  };

  var relevancy = {};

  d3.json("file:///home/jvera/Escritorio/Visualizacion/tpe-personal/data.json", function(json) {
    console.log(json);
  });

  for (var data in dataset) {
    relevancy[data] = {
      "relevant": 0,
      "irrelevant": 0,
      "total": 0
    };
    $.each(dataset[data].messages, function(){
      if ($(this).relevant) {
        relevancy[data].relevant ++;
      } else {
        relevancy[data].irrelevant ++;
      };
      relevancy[data].total ++;
    });
  };
  console.log(relevancy);

  getJson(dataset);

});
