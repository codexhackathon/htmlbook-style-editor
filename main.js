$(function() {

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/solarized_dark");
    editor.getSession().setMode("ace/mode/css");

    editor.commands.addCommand({
      name: 'Apply style to iframe',
      bindKey: {win: 'Ctrl-s',  mac: 'Command-Option-F'},
      exec: function(editor){applyStyle(editor)},
      readOnly: true // false if this command should not apply in readOnly mode
    });

    var applyStyle = function(editor) {
      var style = editor.getValue();
      console.log('hit it');
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
    var index = $('#book-select-dropdown').val() * 1;
    console.log(index);
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

  function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  }

  $('#save').click(function() { download('style.css', editor.getValue())});
  //onClick="javascriot: download('style.css', editor.getValue())"



});
