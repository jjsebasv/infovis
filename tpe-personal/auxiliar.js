$( document ).ready(function() {
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
});
