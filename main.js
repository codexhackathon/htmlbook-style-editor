$(function() {

  $('.selection.dropdown')
    .dropdown('setting', 'transition', 'vertical flip');

  $('').on('change', function() {

    $.get('./examples/Frankenstein.html', {
      error: function(response) {
        console.log(response);
        alert('couldn\'t load story');
      },
      success: function(data) {
        $('#htmlbookcontent').html(data);
      }
    });

  });


  $('style').on('keypress', function(e) {

    // ctrl-enter to apply style
    if (e.which === 13 && e.ctrlKey) {
      
    }

  });

});
