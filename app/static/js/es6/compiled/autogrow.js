(function() {
  'use strict';
  init();
  function init() {
    $('#autogrow').click(grow);
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('.autogrow').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    timer = setInterval(growing, 1000);
  }
  function growing() {
    $('.alive:not(.beanstalk)').map((function(i, d) {
      return $(d).attr('data-id');
    })).each((function(i, v) {
      var tree = $((".tree[data-id=" + v + "]"));
      ajax(("/trees/" + v + "/grow"), 'put', null, (function(html) {
        tree.replaceWith(html);
        if ($(html).children().hasClass('beanstalk')) {
          audioBeanStalk.play();
        }
      }));
    }));
  }
})();

//# sourceMappingURL=autogrow.map
