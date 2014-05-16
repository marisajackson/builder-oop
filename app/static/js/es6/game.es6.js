/*jshint unused: false*/

var audioChop, audioBeanStalk;

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell', sell);
    $('#dashboard').on('click', '#purchase-autogrow', purchaseAutoGrow);
    preloadAssets();
  }

  function purchaseAutoGrow(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}/purchase/autogrow`, 'put', null, html=>{
      $('#dashboard').empty().append(html);
    });
  }

  function preloadAssets(){
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.wav';
  }

  function sell(){
    var userId = $('#user').attr('data-id');
    var amount = $('#amount').val();
    ajax(`/users/sell/${userId}`, 'put', {amount:amount}, html=>{
      $('#dashboard').empty().append(html);
    });
  }

  function chop(){
    audioChop.play();
    var userId = $('#user').attr('data-id');
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/chop/${userId}`, 'put', null, html=>{
      tree.replaceWith(html);
      dashboard();
    });
  }

  function dashboard(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/dashboard`, 'get', {userId:userId}, html=>{
      $('#dashboard').empty().append(html);
    });
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, html=>{
      tree.replaceWith(html);
      if($(html).children().hasClass('beanstalk')){
        audioBeanStalk.play();
      }
    });
  }

  function forest(){
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, html=>{
      $('#forest').empty().append(html);
    });
  }

  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('trees/plant', 'post', {userId:userId}, html=>{
      $('#forest').prepend(html);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, html=>{
      $('#dashboard').empty().append(html);
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  }


})();
