var audioChop,
    audioBeanStalk;
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell', sell);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutoGrow);
    preloadAssets();
  }
  function purchaseAutoGrow() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autogrow"), 'put', null, (function(html) {
      $('#dashboard').empty().append(html);
    }));
  }
  function preloadAssets() {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.wav';
  }
  function sell() {
    var userId = $('#user').attr('data-id');
    var amount = $('#amount').val();
    ajax(("/users/sell/" + userId), 'put', {amount: amount}, (function(html) {
      $('#dashboard').empty().append(html);
    }));
  }
  function chop() {
    audioChop.play();
    var userId = $('#user').attr('data-id');
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/chop/" + userId), 'put', null, (function(html) {
      tree.replaceWith(html);
      dashboard();
    }));
  }
  function dashboard() {
    var userId = $('#user').attr('data-id');
    ajax("/users/dashboard", 'get', {userId: userId}, (function(html) {
      $('#dashboard').empty().append(html);
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(html) {
      tree.replaceWith(html);
      if ($(html).children().hasClass('beanstalk')) {
        audioBeanStalk.play();
      }
    }));
  }
  function forest() {
    var userId = $('#user').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(html) {
      $('#forest').empty().append(html);
    }));
  }
  function plant() {
    var userId = $('#user').attr('data-id');
    ajax('trees/plant', 'post', {userId: userId}, (function(html) {
      $('#forest').prepend(html);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(html) {
      $('#dashboard').empty().append(html);
    }));
  }
  function ajax(url, type) {
    var data = arguments[2] !== (void 0) ? arguments[2] : {};
    var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
      return console.log(r);
    });
    var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  }
})();

//# sourceMappingURL=game.map
