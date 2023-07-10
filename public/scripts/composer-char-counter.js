$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const counterLimit = 140;
    //grap tweet-text id and counter class using 'this'
    let val = $(`#${this.id}`).val();
    let counter = $('.' + $(`#${this.id}`).parents()[0].counter.name);
    
    let counting = counterLimit - val.length;
    if (counting < 0) {
      $(counter).css('background-color', 'red');
      $(counter).val(counting);
    } else {
      $(counter).css('background-color', 'transparent');
      $(counter).val(counting);
    }
  });
});

