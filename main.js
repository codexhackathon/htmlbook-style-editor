$(function() {

  $('.selection.dropdown').dropdown('setting', 'transition', 'vertical flip');

  var books = [
    'examples/Pride_and_Prejudice.html',
    'examples/Frankenstein.html',
    'examples/Moby-Dick.html',
    'examples/The_Time_Machine.html',
  ];

  var loadBook = function(index) {
    $.ajax(books[index], {
      error: function(response) {
        console.log(response);
        alert('couldn\'t load story');
      },
      success: function(data) {
        $('iframe#html-book-content').contents().find('body').html(data);
      }
    });
  };

  loadBook(1);

  $('#book-select').on('change', function() {
    var index = $('#book-select').val() * 1;
    loadBook(index);
  });


  $('style[contenteditable]').on('keypress', function(e) {

    // ctrl-enter to apply style
    if (e.which === 13 && e.ctrlKey) {
      e.preventDefault();
      var style = $('style[contenteditable]').text();
      $('iframe').contents().find('head').html('<style>' + style + '</style>');
    }

  });

});
