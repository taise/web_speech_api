(function(){
    var r = new webkitSpeechRecognition();
    r.lang = "ja-JP";
    r.continuous = true;
    r.interimResults = true;

    var sentenceCnt = 0;

    // control edit by this mode
    //  - read: When you click a sentence,
    //          you can edit the text
    //  - edit: While you finished to edit,
    //          you can't change other sentences.
    var mode = "read";

    $('#select-lang').change(function(){
        r.lang = $('#select-lang').val();
        console.log(r.lang);
    });

    $('#start').click(function(){
        r.start();
        $("#state").text("start");
    });
    $('#stop').click(function(){ r.stop() });

    r.onsoundstart = function(){
      $("#state").text("listening...");
    };

    r.onsoundend = function(){
      $("#state").text("stop");
    };

    r.onnomatch = function(){
      $("#speaking").text("Could you speak more slowly, please?");
    };

    r.onerror = function(){
      $("#state").text("error");
      $("#speaking").text("error");
    };

    r.onresult = function(event){
      sentenceCnt += 1;
      var sentenceId = "sentence_" + sentenceCnt;

      var results = event.results;
      for (var i = event.resultIndex; i<results.length; i++){
        $('#speaking').text(results[i][0].transcript);

        if(results[i].isFinal == true) {
          appendSpoke(sentenceId);
          editable(sentenceId);
        }
      };
    };

    var appendSpoke = function(sentenceId) {
      var $spoke = $('#speaking').clone()
      .removeAttr("id")
      .attr("id", sentenceId)
      .addClass("sentence");
      $("#text").append($spoke);
    };

    var updateSentence = function($sentence, $textbox) {
      $sentence.text($textbox.val());
      $textbox.remove();
      mode = "read";
    };

    var editable = function(sentenceId) {
      var $sentence = $("#" + sentenceId);
      var editInput = createEditInput(sentenceId);

      $sentence.click(function(){
          if(mode === "read") {
            mode = "edit";
            $sentence.after(editInput);
            var $textbox = $('#edit_' + sentenceId);
            $textbox.focus();

            $textbox.blur(function(e) {
                updateSentence($sentence, $textbox);
            });
            $textbox.keypress(function(e) {
                if (e.keyCode != 13) return;
                updateSentence($sentence, $textbox);
            });
          }
      });
    };

    var createEditInput = function(sentenceId) {
      return "<input id='" + "edit_" + sentenceId + "' " +
             "class='form-control'" +
             "type='text' " + 
             "value='" + $('#' + sentenceId).text() + "'/>";
    };
})();
