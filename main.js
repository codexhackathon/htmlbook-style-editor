$(function() {

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/solarized_dark");
    editor.getSession().setMode("ace/mode/css");

    editor.commands.addCommand({
      name: 'Apply style to iframe',
      bindKey: {win: 'Ctrl-s',  Mac: 'Command-s'},
      exec: function(editor){applyStyle(editor)},
      readOnly: true // false if this command should not apply in readOnly mode
    });

    var applyStyle = function(editor) {
      var style = editor.getValue();
      $('iframe').contents().find('head').html('<style>' + style + '</style>');
    }


  $('.selection.dropdown').dropdown('setting', 'transition', 'vertical flip');

  var books = [
    'examples/Pride_and_Prejudice.html',
    'examples/Frankenstein.html',
    'examples/Moby-Dick.html',
    'examples/The_Time_Machine.html',
  ];

  var styles = [
    'styles/orly.css',
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


  var loadStyle = function(index) {
    $.ajax(styles[index], {
      error: function(resp) {
        console.log(resp);
        alert("couldn't load style");
    },
    success: function(data) {
      console.log("success");
      editor.setValue(data);
    }
  })}

  $('#style-select').on('change', function() {
    var index = $('#style-select').val() * 1;
    console.log(index);
    loadStyle(index);
  });



});
